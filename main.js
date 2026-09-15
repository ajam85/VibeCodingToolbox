const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const configPath = path.join(app.getPath("userData"), "projects.json");
const settingsPath = path.join(app.getPath("userData"), "settings.json");
const changelogPath = path.join(__dirname, "changelog.json");

const DEFAULT_SETTINGS = { theme: "dark", language: "cs" };

const MESSAGES = {
  cs: {
    syncHeader: (name) => `=== Synchronizace "${name}" ===`,
    initRepo: "Zakládám lokální git repozitář...",
    uploading: "Nahrávám na GitHub...",
    done: "Hotovo.",
    pushFailedLog: "Push se nepovedl.",
    pathMissingLog: (p) => `Cesta neexistuje: ${p}`,
    pathMissingResult: "Cesta k projektu neexistuje.",
    gitUserMissingLog: "Git nezná tvé jméno/email.",
    gitUserMissingResult:
      'Git nezná tvé jméno/email. V terminálu jednou nastav:\ngit config --global user.name "Tvoje Jméno"\ngit config --global user.email "tvuj@email.cz"',
    projectNotFound: "Projekt nenalezen.",
    successResult: "Projekt je aktuální na GitHubu.",
    pushFailedResult: "Push se nepovedl. Zkontroluj log výše (např. přihlášení nebo adresu repa).",
  },
  en: {
    syncHeader: (name) => `=== Syncing "${name}" ===`,
    initRepo: "Setting up local git repository...",
    uploading: "Uploading to GitHub...",
    done: "Done.",
    pushFailedLog: "Push failed.",
    pathMissingLog: (p) => `Path does not exist: ${p}`,
    pathMissingResult: "The project path does not exist.",
    gitUserMissingLog: "Git does not know your name/email.",
    gitUserMissingResult:
      'Git does not know your name/email. In a terminal, set it once:\ngit config --global user.name "Your Name"\ngit config --global user.email "you@email.com"',
    projectNotFound: "Project not found.",
    successResult: "The project is up to date on GitHub.",
    pushFailedResult: "Push failed. Check the log above (e.g. sign-in or repo address).",
  },
};

function loadProjects() {
  if (!fs.existsSync(configPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return [];
  }
}

function saveProjects(projects) {
  fs.writeFileSync(configPath, JSON.stringify(projects, null, 2));
}

function loadSettings() {
  if (!fs.existsSync(settingsPath)) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(fs.readFileSync(settingsPath, "utf-8")) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

function loadChangelog() {
  try {
    return JSON.parse(fs.readFileSync(changelogPath, "utf-8"));
  } catch {
    return [];
  }
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 940,
    height: 660,
    minWidth: 720,
    minHeight: 480,
    backgroundColor: "#191B1F",
    title: "VibeCoding Toolbox",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// --- settings (jazyk, motiv) ---

ipcMain.handle("settings:get", () => loadSettings());

ipcMain.handle("settings:set", (event, updates) => {
  const settings = { ...loadSettings(), ...updates };
  saveSettings(settings);
  return settings;
});

// --- info o aplikaci / verzreport ---

ipcMain.handle("app:info", () => ({
  version: app.getVersion(),
  changelog: loadChangelog(),
}));

// --- projekty ---

ipcMain.handle("projects:list", () => loadProjects());

ipcMain.handle("projects:add", (event, project) => {
  const projects = loadProjects();
  projects.push({
    id: Date.now().toString(),
    branch: "main",
    lastSync: null,
    description: "",
    notes: [],
    ...project,
  });
  saveProjects(projects);
  return projects;
});

ipcMain.handle("projects:update", (event, { id, updates }) => {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx >= 0) {
    projects[idx] = { ...projects[idx], ...updates };
    saveProjects(projects);
  }
  return projects;
});

ipcMain.handle("projects:remove", (event, id) => {
  const projects = loadProjects().filter((p) => p.id !== id);
  saveProjects(projects);
  return projects;
});

ipcMain.handle("dialog:pick-folder", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

function runCmd(cmd, args, cwd) {
  return new Promise((resolve) => {
    let proc;
    try {
      proc = spawn(cmd, args, { cwd, shell: false });
    } catch (err) {
      resolve({ ok: false, out: err.message });
      return;
    }
    let out = "";
    proc.stdout.on("data", (d) => {
      out += d.toString();
      mainWindow.webContents.send("sync:log", d.toString());
    });
    proc.stderr.on("data", (d) => {
      out += d.toString();
      mainWindow.webContents.send("sync:log", d.toString());
    });
    proc.on("close", (code) => resolve({ ok: code === 0, out }));
    proc.on("error", (err) => resolve({ ok: false, out: err.message }));
  });
}

ipcMain.handle("projects:sync", async (event, { id, lang }) => {
  const M = MESSAGES[lang] || MESSAGES.cs;
  const projects = loadProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return { ok: false, message: M.projectNotFound };

  const send = (line) => mainWindow.webContents.send("sync:log", line + "\n");
  const source = project.source;
  const repo = project.repo;
  const branch = project.branch || "main";

  if (!fs.existsSync(source)) {
    send(M.pathMissingLog(source));
    return { ok: false, message: M.pathMissingResult };
  }

  send(M.syncHeader(project.name));
  const gitDir = path.join(source, ".git");
  const hasGit = fs.existsSync(gitDir);

  if (!hasGit) {
    send(M.initRepo);
    await runCmd("git", ["init"], source);
    await runCmd("git", ["branch", "-M", branch], source);
    await runCmd("git", ["remote", "add", "origin", repo], source);
  } else {
    const check = await runCmd("git", ["remote", "get-url", "origin"], source);
    if (!check.ok || check.out.trim() !== repo) {
      await runCmd("git", ["remote", "remove", "origin"], source);
      await runCmd("git", ["remote", "add", "origin", repo], source);
    }
  }

  await runCmd("git", ["add", "-A"], source);

  const message = `${lang === "en" ? "Update" : "Aktualizace"} ${new Date().toLocaleString(
    lang === "en" ? "en-US" : "cs-CZ"
  )}`;
  const commit = await runCmd("git", ["commit", "-m", message], source);

  if (!commit.ok && /Please tell me who you are/i.test(commit.out)) {
    send(M.gitUserMissingLog);
    return { ok: false, message: M.gitUserMissingResult };
  }

  send(M.uploading);
  const push = await runCmd("git", ["push", "--force", "-u", "origin", branch], source);

  const projectsNow = loadProjects();
  const idx = projectsNow.findIndex((p) => p.id === id);
  if (idx >= 0) {
    projectsNow[idx].lastSync = new Date().toISOString();
    saveProjects(projectsNow);
  }

  if (push.ok) {
    send(M.done);
    return { ok: true, message: M.successResult };
  } else {
    send(M.pushFailedLog);
    return { ok: false, message: M.pushFailedResult };
  }
});

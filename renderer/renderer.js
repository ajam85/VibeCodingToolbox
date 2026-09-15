// --- překlady ---

const translations = {
  cs: {
    projects: "Projekty",
    emptyHint: 'Zatím tu nemáš žádný projekt. Přidej ho tlačítkem „+" vlevo nahoře.',
    github: "GitHub",
    syncing: "Nahrávám...",
    edit: "Upravit",
    projectDescription: "Popis projektu",
    projectDescriptionPlaceholder: "Krátce, o co v projektu jde...",
    notes: "Poznámky",
    copyAll: "Kopírovat vše",
    copied: "Zkopírováno",
    newNotePlaceholder: 'Nová poznámka... (Enter pro přidání)',
    add: "Přidat",
    progress: "Průběh",
    logPlaceholder: "Tady se zobrazí průběh nahrávání na GitHub...",
    projectName: "Název projektu",
    projectNamePlaceholder: "např. Moje Android app",
    sourceFolder: "Zdrojová složka",
    sourceFolderPlaceholder: "vyber složku na disku",
    repoUrl: "GitHub repozitář (URL)",
    choose: "Vybrat...",
    cancel: "Zrušit",
    appSettings: "Nastavení aplikace",
    language: "Jazyk",
    appearance: "Vzhled",
    dark: "Tmavý",
    light: "Světlý",
    openVersionReport: "Zobrazit verzreport",
    close: "Zavřít",
    versionReport: "Verzreport",
    newProject: "Nový projekt",
    editProjectSettings: "Nastavení projektu",
    addProjectBtn: "Přidat projekt",
    saveChanges: "Uložit změny",
    fillAllFields: "Vyplň prosím všechna pole.",
    repoUrlError:
      "Adresa repozitáře by měla vypadat jako\nhttps://github.com/uzivatel/repo.git",
    notUploadedYet: "Ještě nenahráno",
    lastUploaded: (date) => `Naposledy nahráno ${date}`,
    confirmRemove: (name) => `Opravdu odebrat projekt „${name}" ze seznamu?`,
    currentVersion: (v) => `Aktuální verze: ${v}`,
  },
  en: {
    projects: "Projects",
    emptyHint: 'No projects yet. Add one with the "+" button at the top left.',
    github: "GitHub",
    syncing: "Uploading...",
    edit: "Edit",
    projectDescription: "Project description",
    projectDescriptionPlaceholder: "Briefly, what this project is about...",
    notes: "Notes",
    copyAll: "Copy all",
    copied: "Copied",
    newNotePlaceholder: "New note... (Enter to add)",
    add: "Add",
    progress: "Progress",
    logPlaceholder: "The GitHub upload progress will appear here...",
    projectName: "Project name",
    projectNamePlaceholder: "e.g. My Android app",
    sourceFolder: "Source folder",
    sourceFolderPlaceholder: "choose a folder on disk",
    repoUrl: "GitHub repository (URL)",
    choose: "Choose...",
    cancel: "Cancel",
    appSettings: "App settings",
    language: "Language",
    appearance: "Appearance",
    dark: "Dark",
    light: "Light",
    openVersionReport: "Show version report",
    close: "Close",
    versionReport: "Version report",
    newProject: "New project",
    editProjectSettings: "Project settings",
    addProjectBtn: "Add project",
    saveChanges: "Save changes",
    fillAllFields: "Please fill in all fields.",
    repoUrlError:
      "The repository address should look like\nhttps://github.com/username/repo.git",
    notUploadedYet: "Not uploaded yet",
    lastUploaded: (date) => `Last uploaded ${date}`,
    confirmRemove: (name) => `Remove project "${name}" from the list?`,
    currentVersion: (v) => `Current version: ${v}`,
  },
};

let currentLanguage = "cs";
let currentTheme = "dark";

function t(key) {
  return (translations[currentLanguage] && translations[currentLanguage][key]) ?? key;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (typeof value === "string") el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = t(key);
    if (typeof value === "string") el.placeholder = value;
  });
}

// --- DOM reference ---

const tabList = document.getElementById("tab-list");
const emptyHint = document.getElementById("empty-hint");
const panelContent = document.getElementById("panel-content");
const panelTitle = document.getElementById("panel-title");
const panelMeta = document.getElementById("panel-meta");
const logOutput = document.getElementById("log-output");

const syncBtn = document.getElementById("sync-btn");
const settingsBtn = document.getElementById("settings-btn");
const removeBtn = document.getElementById("remove-btn");

const descriptionBox = document.getElementById("description-box");
const notesList = document.getElementById("notes-list");
const newNoteInput = document.getElementById("new-note-input");
const addNoteBtn = document.getElementById("add-note-btn");
const copyAllBtn = document.getElementById("copy-all-btn");

const addBtn = document.getElementById("add-btn");
const addDialog = document.getElementById("add-dialog");
const cancelAddBtn = document.getElementById("cancel-add-btn");
const confirmAddBtn = document.getElementById("confirm-add-btn");
const pickFolderBtn = document.getElementById("pick-folder-btn");

const dialogTitle = document.getElementById("dialog-title");
const inputName = document.getElementById("input-name");
const inputSource = document.getElementById("input-source");
const inputRepo = document.getElementById("input-repo");
const addError = document.getElementById("add-error");

const settingsGearBtn = document.getElementById("settings-gear-btn");
const settingsDialog = document.getElementById("settings-dialog");
const closeSettingsBtn = document.getElementById("close-settings-btn");
const languageToggle = document.getElementById("language-toggle");
const themeToggle = document.getElementById("theme-toggle");
const openVersionBtn = document.getElementById("open-version-btn");

const versionDialog = document.getElementById("version-dialog");
const versionCurrent = document.getElementById("version-current");
const versionListEl = document.getElementById("version-list");
const closeVersionBtn = document.getElementById("close-version-btn");

let projects = [];
let activeProjectId = null;
let syncingId = null;
let editingId = null; // pro dialog nastavení projektu (název/cesta/repo)
let appInfo = { version: "", changelog: [] };

function getActiveProject() {
  return projects.find((p) => p.id === activeProjectId) || null;
}

function formatDate(iso) {
  if (!iso) return t("notUploadedYet");
  const d = new Date(iso);
  const locale = currentLanguage === "en" ? "en-US" : "cs-CZ";
  return t("lastUploaded")(d.toLocaleString(locale));
}

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// --- sidebar tabs ---

function renderTabs() {
  tabList.innerHTML = "";
  for (const project of projects) {
    const tab = document.createElement("button");
    tab.className = "tab-btn" + (project.id === activeProjectId ? " active" : "");
    tab.textContent = project.name;
    tab.addEventListener("click", () => {
      activeProjectId = project.id;
      renderAll();
    });
    tabList.appendChild(tab);
  }
}

// --- main panel ---

function renderPanel() {
  const project = getActiveProject();

  emptyHint.classList.toggle("hidden", !!project);
  panelContent.classList.toggle("hidden", !project);

  if (!project) return;

  panelTitle.textContent = project.name;
  panelMeta.textContent = `${project.source} → ${project.repo}   ·   ${formatDate(project.lastSync)}`;

  const isSyncing = syncingId === project.id;
  syncBtn.textContent = isSyncing ? t("syncing") : t("github");
  syncBtn.disabled = isSyncing;

  descriptionBox.value = project.description || "";
  requestAnimationFrame(() => autoResize(descriptionBox));

  renderNotes(project);
}

function renderNotes(project) {
  notesList.innerHTML = "";
  const notes = project.notes || [];

  for (const note of notes) {
    const row = document.createElement("div");
    row.className = "note-row" + (note.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!note.done;
    checkbox.addEventListener("change", () => toggleNoteDone(project.id, note.id));

    const textarea = document.createElement("textarea");
    textarea.className = "note-text";
    textarea.value = note.text;
    textarea.rows = 1;
    textarea.addEventListener("input", () => autoResize(textarea));
    textarea.addEventListener("blur", () => {
      updateNoteText(project.id, note.id, textarea.value);
    });

    const removeNoteBtn = document.createElement("button");
    removeNoteBtn.className = "note-remove";
    removeNoteBtn.textContent = "✕";
    removeNoteBtn.addEventListener("click", () => removeNote(project.id, note.id));

    row.appendChild(checkbox);
    row.appendChild(textarea);
    row.appendChild(removeNoteBtn);
    notesList.appendChild(row);

    requestAnimationFrame(() => autoResize(textarea));
  }
}

function renderAll() {
  applyStaticTranslations();
  renderTabs();
  renderPanel();
}

// --- data helpers ---

async function loadProjects() {
  projects = await window.api.listProjects();
  if (!activeProjectId && projects.length > 0) {
    activeProjectId = projects[0].id;
  }
  renderAll();
}

async function persistProject(id, updates) {
  projects = await window.api.updateProject(id, updates);
}

function updateLocalProject(id, updater) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx >= 0) updater(projects[idx]);
}

// --- description ---

descriptionBox.addEventListener("input", () => autoResize(descriptionBox));
descriptionBox.addEventListener("blur", async () => {
  const project = getActiveProject();
  if (!project) return;
  await persistProject(project.id, { description: descriptionBox.value });
});

// --- notes ---

async function toggleNoteDone(projectId, noteId) {
  updateLocalProject(projectId, (p) => {
    const note = (p.notes || []).find((n) => n.id === noteId);
    if (note) note.done = !note.done;
  });
  const project = projects.find((p) => p.id === projectId);
  await persistProject(projectId, { notes: project.notes });
  renderAll();
}

async function updateNoteText(projectId, noteId, text) {
  updateLocalProject(projectId, (p) => {
    const note = (p.notes || []).find((n) => n.id === noteId);
    if (note) note.text = text;
  });
  const project = projects.find((p) => p.id === projectId);
  await persistProject(projectId, { notes: project.notes });
}

async function removeNote(projectId, noteId) {
  updateLocalProject(projectId, (p) => {
    p.notes = (p.notes || []).filter((n) => n.id !== noteId);
  });
  const project = projects.find((p) => p.id === projectId);
  await persistProject(projectId, { notes: project.notes });
  renderAll();
}

async function addNote() {
  const project = getActiveProject();
  const text = newNoteInput.value.trim();
  if (!project || !text) return;

  updateLocalProject(project.id, (p) => {
    p.notes = p.notes || [];
    p.notes.push({ id: Date.now().toString(), text, done: false });
  });
  const updated = projects.find((p) => p.id === project.id);
  await persistProject(project.id, { notes: updated.notes });
  newNoteInput.value = "";
  renderAll();
  newNoteInput.focus();
}

addNoteBtn.addEventListener("click", addNote);
newNoteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNote();
});

copyAllBtn.addEventListener("click", async () => {
  const project = getActiveProject();
  if (!project) return;
  const notes = project.notes || [];
  const text = notes.map((n) => `[${n.done ? "x" : " "}] ${n.text}`).join("\n");
  await navigator.clipboard.writeText(text);

  const original = copyAllBtn.textContent;
  copyAllBtn.textContent = t("copied");
  setTimeout(() => (copyAllBtn.textContent = original), 1200);
});

// --- sync ---

syncBtn.addEventListener("click", async () => {
  const project = getActiveProject();
  if (!project) return;

  syncingId = project.id;
  renderPanel();
  logOutput.textContent = "";

  const result = await window.api.syncProject(project.id, currentLanguage);

  syncingId = null;
  await loadProjects();

  logOutput.textContent += `\n${result.ok ? "✔" : "✘"} ${result.message}\n`;
  logOutput.scrollTop = logOutput.scrollHeight;
});

// --- remove project ---

removeBtn.addEventListener("click", async () => {
  const project = getActiveProject();
  if (!project) return;
  const sure = confirm(t("confirmRemove")(project.name));
  if (!sure) return;

  projects = await window.api.removeProject(project.id);
  activeProjectId = projects.length > 0 ? projects[0].id : null;
  renderAll();
});

// --- add / edit project dialog (název, cesta, repo) ---

function openDialog(project) {
  editingId = project ? project.id : null;

  if (project) {
    dialogTitle.textContent = t("editProjectSettings");
    confirmAddBtn.textContent = t("saveChanges");
    inputName.value = project.name;
    inputSource.value = project.source;
    inputRepo.value = project.repo;
  } else {
    dialogTitle.textContent = t("newProject");
    confirmAddBtn.textContent = t("addProjectBtn");
    inputName.value = "";
    inputSource.value = "";
    inputRepo.value = "";
  }

  addError.classList.add("hidden");
  addDialog.classList.remove("hidden");
  inputName.focus();
}

function closeDialog() {
  addDialog.classList.add("hidden");
  editingId = null;
}

addBtn.addEventListener("click", () => openDialog(null));
settingsBtn.addEventListener("click", () => openDialog(getActiveProject()));
cancelAddBtn.addEventListener("click", closeDialog);

pickFolderBtn.addEventListener("click", async () => {
  const folder = await window.api.pickFolder();
  if (folder) {
    inputSource.value = folder;
    if (!inputName.value) {
      inputName.value = folder.split(/[\\/]/).pop();
    }
  }
});

confirmAddBtn.addEventListener("click", async () => {
  const name = inputName.value.trim();
  const source = inputSource.value.trim();
  const repo = inputRepo.value.trim();

  if (!name || !source || !repo) {
    addError.textContent = t("fillAllFields");
    addError.classList.remove("hidden");
    return;
  }
  if (!/^https?:\/\/.+\.git$/.test(repo) && !/^git@.+:.+\.git$/.test(repo)) {
    addError.textContent = t("repoUrlError");
    addError.classList.remove("hidden");
    return;
  }

  if (editingId) {
    projects = await window.api.updateProject(editingId, { name, source, repo });
  } else {
    projects = await window.api.addProject({ name, source, repo });
    const newest = projects[projects.length - 1];
    activeProjectId = newest.id;
  }
  closeDialog();
  renderAll();
});

// --- nastavení aplikace (jazyk, motiv), ozubené kolo v pásu projektů ---

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.value === theme);
  });
}

function applyLanguage(lang) {
  currentLanguage = lang;
  languageToggle.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.value === lang);
  });
  renderAll();
}

async function loadSettings() {
  const settings = await window.api.getSettings();
  applyTheme(settings.theme || "dark");
  applyLanguage(settings.language || "cs");
}

settingsGearBtn.addEventListener("click", () => {
  settingsDialog.classList.remove("hidden");
});
closeSettingsBtn.addEventListener("click", () => {
  settingsDialog.classList.add("hidden");
});

languageToggle.addEventListener("click", async (e) => {
  const btn = e.target.closest(".toggle-btn");
  if (!btn) return;
  const lang = btn.dataset.value;
  applyLanguage(lang);
  await window.api.setSettings({ language: lang });
});

themeToggle.addEventListener("click", async (e) => {
  const btn = e.target.closest(".toggle-btn");
  if (!btn) return;
  const theme = btn.dataset.value;
  applyTheme(theme);
  await window.api.setSettings({ theme });
});

// --- verzreport ---

async function loadAppInfo() {
  appInfo = await window.api.getAppInfo();
}

function renderVersionReport() {
  versionCurrent.textContent = t("currentVersion")(appInfo.version);
  versionListEl.innerHTML = "";

  for (const entry of appInfo.changelog) {
    const block = document.createElement("div");
    block.className = "version-entry";

    const header = document.createElement("div");
    header.className = "version-entry-header";
    header.innerHTML = `
      <span class="version-entry-number">v${entry.version}</span>
      <span class="version-entry-date">${entry.date}</span>
    `;

    const list = document.createElement("ul");
    const changes = (entry.changes && entry.changes[currentLanguage]) || entry.changes || [];
    for (const change of changes) {
      const li = document.createElement("li");
      li.textContent = change;
      list.appendChild(li);
    }

    block.appendChild(header);
    block.appendChild(list);
    versionListEl.appendChild(block);
  }
}

openVersionBtn.addEventListener("click", () => {
  settingsDialog.classList.add("hidden");
  renderVersionReport();
  versionDialog.classList.remove("hidden");
});
closeVersionBtn.addEventListener("click", () => {
  versionDialog.classList.add("hidden");
});

window.api.onSyncLog((line) => {
  logOutput.textContent += line;
  logOutput.scrollTop = logOutput.scrollHeight;
});

// --- start ---

(async function init() {
  await loadSettings();
  await loadAppInfo();
  await loadProjects();
})();

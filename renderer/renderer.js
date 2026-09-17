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
    copyNote: "Kopírovat poznámku",
    copied: "Zkopírováno",
    newNotePlaceholder: 'Nová poznámka... (Enter pro přidání)',
    add: "Přidat",
    progress: "Průběh",
    logPlaceholder: "Tady se zobrazí průběh nahrávání na GitHub...",
    projectName: "Název projektu",
    projectNamePlaceholder: "např. Moje Android app",
    sourceFolder: "Zdrojová složka (volitelné)",
    sourceFolderPlaceholder: "vyber složku na disku, nebo nech prázdné",
    repoUrl: "GitHub repozitář (volitelné)",
    repoUrlPlaceholder: "https://github.com/uzivatel/repo.git",
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
    removeProject: "Odebrat projekt",
    backup: "Zálohování",
    exportAll: "Exportovat vše",
    importBackup: "Importovat zálohu",
    exportProject: "Exportovat projekt",
    exported: "Exportováno",
    imported: (count) => `Importováno projektů: ${count}`,
    importFailed: "Import se nepovedl - zkontroluj, že jde o platný soubor zálohy.",
    fillAllFields: "Vyplň prosím alespoň název projektu.",
    repoUrlError:
      "Adresa repozitáře by měla vypadat jako\nhttps://github.com/uzivatel/repo.git",
    notUploadedYet: "Ještě nenahráno",
    lastUploaded: (date) => `Naposledy nahráno ${date}`,
    confirmRemove: (name) => `Opravdu odebrat projekt „${name}" ze seznamu?`,
    currentVersion: (v) => `Aktuální verze: ${v}`,
    ideaOnly: "Zatím jen nápad – bez složky a repozitáře",
    sourceNotSet: "složka nenastavena",
    repoNotSet: "repozitář nenastaven",
    syncNeedsSetup: "Nejdřív v Nastavení doplň složku a GitHub repozitář.",
    descriptionLockedHint: "Upravíš v Nastavení projektu",
    noDescriptionYet: "Zatím bez popisu – klikni pro doplnění v Nastavení projektu.",
    history: "Historie",
    uploadHistory: "Historie nahrávání",
    noHistoryYet: "Zatím žádné nahrání.",
    whatChanged: "Co se v projektu změnilo?",
    whatChangedHint: "Každý řádek = jedna změna. Necháš-li prázdné, nahraje se bez popisu.",
    whatChangedPlaceholder:
      "Přidáno: přihlašovací obrazovka\nOpraveno: pád při ukládání\nOdebráno: staré nastavení",
    autoloadedHint: "Načteno automaticky ze souboru VIBECODING_CHANGES.txt v projektu.",
    uploadConfirm: "Nahrát",
    masterPromptLabel: "Prompt pro Claude (vlož na začátek práce na projektu)",
    copyPrompt: "Kopírovat prompt",
    promptCopied: "Zkopírováno",
    masterPromptText: (name) =>
      `Pracujeme spolu na projektu${name ? ` „${name}"` : ""}, který budu nahrávat přes aplikaci VibeCoding Toolbox.\n\nProsím: kdykoliv na konci naší práce provedeš nebo shrneš změny v kódu tohoto projektu, zapiš (nebo aktualizuj) v kořeni projektu soubor VIBECODING_CHANGES.txt.\n\nKaždý řádek = jedna funkční změna, srozumitelně pro člověka, ve tvaru:\nPřidáno: ...\nOpraveno: ...\nOdebráno: ...\nZměněno: ...\n\nPokud soubor už existuje a jeho obsah ještě nebyl nahrán na GitHub, nové změny k němu přidej, nepřepisuj starý obsah. Nepiš tam nic technického (čísla řádků, názvy commitů) - jen jasné shrnutí pro člověka, který si to přečte před nahráním.`,
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
    copyNote: "Copy note",
    copied: "Copied",
    newNotePlaceholder: "New note... (Enter to add)",
    add: "Add",
    progress: "Progress",
    logPlaceholder: "The GitHub upload progress will appear here...",
    projectName: "Project name",
    projectNamePlaceholder: "e.g. My Android app",
    sourceFolder: "Source folder (optional)",
    sourceFolderPlaceholder: "choose a folder on disk, or leave empty",
    repoUrl: "GitHub repository (optional)",
    repoUrlPlaceholder: "https://github.com/username/repo.git",
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
    removeProject: "Remove project",
    backup: "Backup",
    exportAll: "Export all",
    importBackup: "Import backup",
    exportProject: "Export project",
    exported: "Exported",
    imported: (count) => `Imported projects: ${count}`,
    importFailed: "Import failed - check that this is a valid backup file.",
    fillAllFields: "Please fill in at least the project name.",
    repoUrlError:
      "The repository address should look like\nhttps://github.com/username/repo.git",
    notUploadedYet: "Not uploaded yet",
    lastUploaded: (date) => `Last uploaded ${date}`,
    confirmRemove: (name) => `Remove project "${name}" from the list?`,
    currentVersion: (v) => `Current version: ${v}`,
    ideaOnly: "Just an idea for now – no folder or repo yet",
    sourceNotSet: "folder not set",
    repoNotSet: "repo not set",
    syncNeedsSetup: "First add a folder and GitHub repo in Settings.",
    descriptionLockedHint: "Edit it in Project settings",
    noDescriptionYet: "No description yet – click to add one in Project settings.",
    history: "History",
    uploadHistory: "Upload history",
    noHistoryYet: "No uploads yet.",
    whatChanged: "What changed in the project?",
    whatChangedHint: "One line = one change. Leave it empty to upload without a description.",
    whatChangedPlaceholder:
      "Added: login screen\nFixed: crash on save\nRemoved: old settings page",
    autoloadedHint: "Auto-loaded from VIBECODING_CHANGES.txt in the project folder.",
    uploadConfirm: "Upload",
    masterPromptLabel: "Prompt for Claude (paste at the start of working on the project)",
    copyPrompt: "Copy prompt",
    promptCopied: "Copied",
    masterPromptText: (name) =>
      `We're working together on the project${name ? ` "${name}"` : ""}, which I'll be uploading with the VibeCoding Toolbox app.\n\nPlease: whenever you finish or summarize code changes on this project in a session, write (or update) a file named VIBECODING_CHANGES.txt in the project root.\n\nOne line = one functional change, written for a human, in this style:\nAdded: ...\nFixed: ...\nRemoved: ...\nChanged: ...\n\nIf the file already exists and its contents haven't been uploaded to GitHub yet, add the new changes to it instead of overwriting it. Don't include technical details (line numbers, commit hashes) - just a clear summary for a human to read before uploading.`,
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
const inputDescription = document.getElementById("input-description");
const masterPromptBox = document.getElementById("master-prompt-box");
const copyMasterPromptBtn = document.getElementById("copy-master-prompt-btn");
const addError = document.getElementById("add-error");
const deleteProjectBtn = document.getElementById("delete-project-btn");
const exportProjectBtn = document.getElementById("export-project-btn");
const exportAllBtn = document.getElementById("export-all-btn");
const importBackupBtn = document.getElementById("import-backup-btn");

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

const historyBtn = document.getElementById("history-btn");
const historyDialog = document.getElementById("history-dialog");
const historyListEl = document.getElementById("history-list");
const closeHistoryBtn = document.getElementById("close-history-btn");

const changesDialog = document.getElementById("changes-dialog");
const changesInput = document.getElementById("changes-input");
const changesAutoloadHint = document.getElementById("changes-autoload-hint");
const cancelChangesBtn = document.getElementById("cancel-changes-btn");
const confirmChangesBtn = document.getElementById("confirm-changes-btn");

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

function buildMetaLine(project) {
  let pathPart;
  if (project.source && project.repo) {
    pathPart = `${project.source} → ${project.repo}`;
  } else if (!project.source && !project.repo) {
    pathPart = t("ideaOnly");
  } else if (project.source) {
    pathPart = `${project.source} → (${t("repoNotSet")})`;
  } else {
    pathPart = `(${t("sourceNotSet")}) → ${project.repo}`;
  }
  return `${pathPart}   ·   ${formatDate(project.lastSync)}`;
}

function renderPanel() {
  const project = getActiveProject();

  emptyHint.classList.toggle("hidden", !!project);
  panelContent.classList.toggle("hidden", !project);

  if (!project) return;

  panelTitle.textContent = project.name;
  panelMeta.textContent = buildMetaLine(project);

  const canSync = !!(project.source && project.repo);
  const isSyncing = syncingId === project.id;
  syncBtn.textContent = isSyncing ? t("syncing") : t("github");
  syncBtn.disabled = isSyncing || !canSync;
  syncBtn.title = canSync ? "" : t("syncNeedsSetup");

  descriptionBox.value = project.description || t("noDescriptionYet");
  descriptionBox.classList.toggle("is-placeholder", !project.description);
  requestAnimationFrame(() => autoResize(descriptionBox));

  renderNotes(project);
}

function renderNotes(project) {
  notesList.innerHTML = "";
  const notes = [...(project.notes || [])].sort((a, b) => Number(b.id) - Number(a.id));

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

    const copyNoteBtn = document.createElement("button");
    copyNoteBtn.className = "note-copy";
    copyNoteBtn.title = t("copyNote");
    copyNoteBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
    copyNoteBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(note.text);
      copyNoteBtn.classList.add("copied-flash");
      setTimeout(() => copyNoteBtn.classList.remove("copied-flash"), 700);
    });

    const removeNoteBtn = document.createElement("button");
    removeNoteBtn.className = "note-remove";
    removeNoteBtn.textContent = "✕";
    removeNoteBtn.addEventListener("click", () => removeNote(project.id, note.id));

    row.appendChild(checkbox);
    row.appendChild(textarea);
    row.appendChild(copyNoteBtn);
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

// --- description (needitovatelné, úprava jen přes Nastavení projektu) ---

descriptionBox.addEventListener("click", () => {
  const project = getActiveProject();
  if (project) openDialog(project);
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
  const notes = [...(project.notes || [])].sort((a, b) => Number(b.id) - Number(a.id));
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

  const pending = project.source ? await window.api.getPendingChanges(project.source) : null;
  changesInput.value = pending ? pending.trim() : "";
  changesAutoloadHint.classList.toggle("hidden", !pending);

  changesDialog.classList.remove("hidden");
  changesInput.focus();
});

cancelChangesBtn.addEventListener("click", () => {
  changesDialog.classList.add("hidden");
});

confirmChangesBtn.addEventListener("click", async () => {
  const project = getActiveProject();
  if (!project) return;

  const changeNotes = changesInput.value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  changesDialog.classList.add("hidden");

  syncingId = project.id;
  renderPanel();
  logOutput.textContent = "";

  const result = await window.api.syncProject(project.id, currentLanguage, changeNotes);

  syncingId = null;
  await loadProjects();

  logOutput.textContent += `\n${result.ok ? "✔" : "✘"} ${result.message}\n`;
  logOutput.scrollTop = logOutput.scrollHeight;
});

// --- remove project (přesunuto do dialogu Nastavení projektu) ---

deleteProjectBtn.addEventListener("click", async () => {
  if (!editingId) return;
  const project = projects.find((p) => p.id === editingId);
  if (!project) return;

  const sure = confirm(t("confirmRemove")(project.name));
  if (!sure) return;

  projects = await window.api.removeProject(project.id);
  if (activeProjectId === project.id) {
    activeProjectId = projects.length > 0 ? projects[0].id : null;
  }
  closeDialog();
  renderAll();
});

function flashButtonText(btn, text) {
  const original = btn.textContent;
  btn.textContent = text;
  setTimeout(() => (btn.textContent = original), 1400);
}

exportProjectBtn.addEventListener("click", async () => {
  if (!editingId) return;
  const result = await window.api.exportProject(editingId);
  if (result && result.ok) flashButtonText(exportProjectBtn, t("exported"));
});

exportAllBtn.addEventListener("click", async () => {
  const result = await window.api.exportAllProjects();
  if (result && result.ok) flashButtonText(exportAllBtn, t("exported"));
});

importBackupBtn.addEventListener("click", async () => {
  const result = await window.api.importBackup();
  if (result && result.ok) {
    projects = result.projects;
    if (!activeProjectId && projects.length > 0) activeProjectId = projects[0].id;
    flashButtonText(importBackupBtn, t("imported")(result.added));
    renderAll();
  } else if (result && result.error === "invalid-json") {
    alert(t("importFailed"));
  }
});

// --- add / edit project dialog (název, cesta, repo) ---

function updateMasterPrompt() {
  masterPromptBox.value = t("masterPromptText")(inputName.value.trim());
}

inputName.addEventListener("input", updateMasterPrompt);

copyMasterPromptBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(masterPromptBox.value);
  const original = copyMasterPromptBtn.textContent;
  copyMasterPromptBtn.textContent = t("promptCopied");
  setTimeout(() => (copyMasterPromptBtn.textContent = original), 1200);
});

function openDialog(project) {
  editingId = project ? project.id : null;

  if (project) {
    dialogTitle.textContent = t("editProjectSettings");
    confirmAddBtn.textContent = t("saveChanges");
    inputName.value = project.name;
    inputSource.value = project.source;
    inputRepo.value = project.repo;
    inputDescription.value = project.description || "";
  } else {
    dialogTitle.textContent = t("newProject");
    confirmAddBtn.textContent = t("addProjectBtn");
    inputName.value = "";
    inputSource.value = "";
    inputRepo.value = "";
    inputDescription.value = "";
  }

  updateMasterPrompt();
  deleteProjectBtn.classList.toggle("hidden", !project);
  exportProjectBtn.classList.toggle("hidden", !project);
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
  const description = inputDescription.value.trim();

  if (!name) {
    addError.textContent = t("fillAllFields");
    addError.classList.remove("hidden");
    return;
  }
  if (repo && !/^https?:\/\/.+\.git$/.test(repo) && !/^git@.+:.+\.git$/.test(repo)) {
    addError.textContent = t("repoUrlError");
    addError.classList.remove("hidden");
    return;
  }

  if (editingId) {
    projects = await window.api.updateProject(editingId, { name, source, repo, description });
  } else {
    projects = await window.api.addProject({ name, source, repo, description });
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

// --- historie nahrávání projektu ---

function renderHistoryDialog() {
  const project = getActiveProject();
  historyListEl.innerHTML = "";

  const history = (project && project.history) || [];
  if (history.length === 0) {
    const hint = document.createElement("p");
    hint.className = "empty-hint";
    hint.style.padding = "0";
    hint.textContent = t("noHistoryYet");
    historyListEl.appendChild(hint);
    return;
  }

  const locale = currentLanguage === "en" ? "en-US" : "cs-CZ";
  for (const entry of history) {
    const block = document.createElement("div");
    block.className = "version-entry";

    const dateEl = document.createElement("div");
    dateEl.className = "history-entry-date";
    dateEl.textContent = new Date(entry.date).toLocaleString(locale);
    block.appendChild(dateEl);

    if (entry.changes && entry.changes.length > 0) {
      const list = document.createElement("ul");
      for (const change of entry.changes) {
        const li = document.createElement("li");
        li.textContent = change;
        list.appendChild(li);
      }
      block.appendChild(list);
    } else {
      const pre = document.createElement("pre");
      pre.className = "history-summary";
      pre.textContent = entry.diffStat || entry.summary || "";
      block.appendChild(pre);
    }

    historyListEl.appendChild(block);
  }
}

historyBtn.addEventListener("click", () => {
  renderHistoryDialog();
  historyDialog.classList.remove("hidden");
});
closeHistoryBtn.addEventListener("click", () => {
  historyDialog.classList.add("hidden");
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

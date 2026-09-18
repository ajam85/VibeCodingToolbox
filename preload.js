const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAppInfo: () => ipcRenderer.invoke("app:info"),
  getSettings: () => ipcRenderer.invoke("settings:get"),
  setSettings: (updates) => ipcRenderer.invoke("settings:set", updates),

  listProjects: () => ipcRenderer.invoke("projects:list"),
  addProject: (project) => ipcRenderer.invoke("projects:add", project),
  updateProject: (id, updates) => ipcRenderer.invoke("projects:update", { id, updates }),
  removeProject: (id) => ipcRenderer.invoke("projects:remove", id),
  pickFolder: () => ipcRenderer.invoke("dialog:pick-folder"),
  getPendingChanges: (source) => ipcRenderer.invoke("project:pending-changes", source),
  exportAllProjects: () => ipcRenderer.invoke("backup:export-all"),
  exportProject: (id) => ipcRenderer.invoke("backup:export-project", id),
  importBackup: () => ipcRenderer.invoke("backup:import"),
  writeAgentFiles: (source, content, filenames) =>
    ipcRenderer.invoke("project:write-agent-files", { source, content, filenames }),
  syncProject: (id, lang, changeNotes) => ipcRenderer.invoke("projects:sync", { id, lang, changeNotes }),
  onSyncLog: (callback) =>
    ipcRenderer.on("sync:log", (event, line) => callback(line)),
});

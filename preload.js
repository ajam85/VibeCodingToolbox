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
  syncProject: (id, lang) => ipcRenderer.invoke("projects:sync", { id, lang }),
  onSyncLog: (callback) =>
    ipcRenderer.on("sync:log", (event, line) => callback(line)),
});

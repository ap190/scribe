const { app, Menu, shell } = require("electron");
const {
  showMessage,
  showSaveDialog,
  openWorkspaceDialog,
  getFileForCloudSync
} = require("../dialogs");
const { loadWorkspace, createNewWorkspace } = require("../fileHandlers");

function setMainMenu(mainWindow) {
  const template = [
    {
      label: "Workspace",
      submenu: [
        {
          label: "New Workspace",
          click() {
            createNewWorkspace(mainWindow);
          }
        },
        {
          label: "Open Workspace",
          click() {
            const directory = openWorkspaceDialog(mainWindow);
            if (!directory) return;
            loadWorkspace(mainWindow, directory);
          }
        },
        { type: "separator" },
        {
          label: "Save",
          click() {
            mainWindow.webContents.send("save-timeline");
          }
        },
        {
          label: "Save Memory Usage Info",
          click() {
            showSaveDialog(mainWindow);
          }
        },
        {
          label: "Sync to Cloud",
          click() {
            getFileForCloudSync(mainWindow);
          }
        },
        {
          label: "Open a File",
          click() {
            showOpenDialog(mainWindow);
          }
        },
        {
          label: "Clear Workspace",
          click() {
            showMessage(mainWindow);
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo", label: "Undo" },
        { role: "redo", label: "Redo" },
        { type: "separator" },
        { role: "cut", label: "Cut" },
        { role: "copy", label: "Copy" },
        { role: "paste", label: "Paste" },
        { role: "delete", label: "Delete" },
        { role: "selectall", label: "Select all" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "resetzoom", label: "Actual size" },
        { role: "zoomin", label: "Zoom in" },
        { role: "zoomout", label: "Zoom out" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Toggle fullscreen" },
        {
          label: "Toggle Developer Tools",
          accelerator:
            process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: "Inspect Element",
      click: () => {
        remote
          .getCurrentWindow()
          .inspectElement(rightClickPosition.x, rightClickPosition.y);
      }
    },
    {
      role: "window",
      label: "Window",
      submenu: [
        { role: "minimize", label: "Minimize" },
        { role: "close", label: "Close" }
      ]
    },
    {
      role: "help",
      label: "Help",
      submenu: [
        {
          label: "Learn more",
          click() {
            shell.openExternal("https://mindflowai.com");
          }
        }
      ]
    }
  ];

  if (process.platform === "darwin") {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          role: "about",
          label: "About" + " " + app.getName()
        },
        {
          type: "separator"
        },
        {
          role: "services",
          label: "Services",
          submenu: []
        },
        {
          type: "separator"
        },
        {
          role: "hide",
          label: "Hide" + " " + app.getName()
        },
        {
          role: "hideothers",
          label: "Hide others"
        },
        {
          role: "unhide",
          label: "Unhide"
        },
        {
          type: "separator"
        },
        {
          role: "quit",
          label: "Quit" + " " + app.getName()
        }
      ]
    });
    template[1].submenu.push(
      {
        type: "separator"
      },
      {
        label: "Speech",
        submenu: [
          {
            role: "startspeaking",
            label: "Start speaking"
          },
          {
            role: "stopspeaking",
            label: "Stop speaking"
          }
        ]
      }
    );
    template[3].submenu = [
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close"
      },
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize"
      },
      {
        label: "Zoom",
        role: "zoom"
      },
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }
      },
      {
        type: "separator"
      },
      {
        label: "Bring all to front",
        role: "front"
      }
    ];
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = setMainMenu;

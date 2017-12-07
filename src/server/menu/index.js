const electron = require("electron");
const { mainWindow } = require("../../electron-main.js");

const app = electron.app;

const template = [
  {
    label: "Workspace",
    submenu: [
      {
        label: "Open Workspace"
      },
      {
        type: "separator"
      },
      {
        label: "Save",
        click() {
          mainWindow.webContents.send("save-timeline");
        }
      },
      {
        label: "Clear Workspace",
        click() {
          mainWindow.webContents.send("clear-timeline");
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        role: "undo",
        label: "Undo"
      },
      {
        role: "redo",
        label: "Redo"
      },
      {
        type: "separator"
      },
      {
        role: "cut",
        label: "Cut"
      },
      {
        role: "copy",
        label: "Copy"
      },
      {
        role: "paste",
        label: "Paste"
      },
      {
        role: "delete",
        label: "Delete"
      },
      {
        role: "selectall",
        label: "Select all"
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        role: "resetzoom",
        label: "Actual size"
      },
      {
        role: "zoomin",
        label: "Zoom in"
      },
      {
        role: "zoomout",
        label: "Zoom out"
      },
      {
        type: "separator"
      },
      {
        role: "togglefullscreen",
        label: "Toggle fullscreen"
      },
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
      {
        role: "minimize",
        label: "Minimize"
      },
      {
        role: "close",
        label: "Close"
      }
    ]
  },
  {
    role: "help",
    label: "Help",
    submenu: [
      {
        label: "Learn more",
        click() {
          require("electron").shell.openExternal(
            "https://github.com/crilleengvall/electron-tutorial-app"
          );
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

module.exports = template;

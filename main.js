const { app, BrowserWindow } = require("electron");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow(options);
  mainWindow.loadFile(`${__dirname}/app/index.html`);
};

const options = {
  maxWidth: 800,
  maxHeight: 800,
  resizable: false
};

app.on("ready", createWindow);

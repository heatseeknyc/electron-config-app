// example from https://fearby.com/article/create-first-hello-world-electron-app-osx/
const electron = require('electron');
const React = require("react");
const ReactDOM = require("react-dom");
const SerialPort = require("serialport");
const app = electron.app;

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('ready', function() {

        mainWindow = new BrowserWindow({webPreferences:{nodeIntegration: true}, width: 1024, height: 768, icon: path.join(__dirname, 'contents/img/icons/48.png')});

        mainWindow.loadURL(url.format({pathname: path.join(__dirname, 'index.html'), protocol: 'file:', slashes: true } ));

});
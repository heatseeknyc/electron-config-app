"use strict";

// example from https://fearby.com/article/create-first-hello-world-electron-app-osx/
var electron = require('electron');

var React = require("react");

var ReactDOM = require("react-dom");

var SerialPort = require("serialport");

var app = electron.app;

var path = require('path');

var url = require('url');

var BrowserWindow = electron.BrowserWindow;
var mainWindow;
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, 'contents/img/heat_seek_logo_splash-@2x.png')
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
});
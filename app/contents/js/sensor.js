'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var React = require("react");

var ReactDOM = require("react-dom");

function openConsole() {
  document.getElementById('sideConsoleID').style.width = "33%";
}

function closeConsole() {
  document.getElementById('sideConsoleID').style.width = "0%";
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('consoleIcon').addEventListener('click', openConsole);
  document.getElementById('consoleClose').addEventListener('click', closeConsole);
});

var NavBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar() {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavBar).apply(this, arguments));
  }

  _createClass(NavBar, [{
    key: "render",
    value: function render() {
      return React.createElement("nav", {
        "class": "navbar navbar-light bg-light"
      }, React.createElement("a", {
        "class": "navbar-brand",
        href: "https://heatseek.org/"
      }, React.createElement("img", {
        src: "contents/img/heat_seek-logo-@2x-tp.png",
        height: "45",
        "class": "d-inline-block align-top"
      })), React.createElement("ul", {
        "class": "nav justify-content-end"
      }, React.createElement("li", {
        "class": "nav-item"
      }, React.createElement("a", {
        href: "#"
      }, React.createElement("i", {
        "class": "fas fa-terminal fa-lg",
        id: "consoleIcon"
      })))));
    }
  }]);

  return NavBar;
}(React.Component);

;

var SideConsole =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(SideConsole, _React$Component2);

  function SideConsole() {
    _classCallCheck(this, SideConsole);

    return _possibleConstructorReturn(this, _getPrototypeOf(SideConsole).apply(this, arguments));
  }

  _createClass(SideConsole, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "sideConsoleID",
        "class": "sideConsole"
      }, React.createElement("div", {
        "class": "consoleHeader"
      }), React.createElement("a", {
        href: "#"
      }, React.createElement("i", {
        "class": "fas fa-times fa-2x",
        id: "consoleClose"
      })), React.createElement("div", {
        "class": "consoleOutput"
      }, "Filler"), React.createElement("div", {
        "class": "consoleForm"
      }, React.createElement("form", {
        "class": "form-inline"
      }, React.createElement("input", {
        type: "text",
        "class": "form-control ",
        id: "consoleInput",
        placeholder: "For developers only!"
      }), React.createElement("button", {
        type: "submit",
        "class": "btn btn-secondary"
      }, ">"))));
    }
  }]);

  return SideConsole;
}(React.Component);

var App =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(NavBar, null), React.createElement(SideConsole, null));
    }
  }]);

  return App;
}(React.Component);

;
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
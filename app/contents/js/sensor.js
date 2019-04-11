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

var SerialPort = require("serialport");

SerialPort.list().then(function (ports) {
  return ports.forEach(console.log);
}, function (err) {
  return console.error(err);
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
        className: "navbar navbar-light bg-light"
      }, React.createElement("a", {
        className: "navbar-brand",
        href: "https://heatseek.org/"
      }, React.createElement("img", {
        src: "contents/img/heat_seek-logo-@2x-tp.png",
        height: "45",
        className: "d-inline-block align-top"
      })));
    }
  }]);

  return NavBar;
}(React.Component);

;

var SideConsole =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(SideConsole, _React$Component2);

  function SideConsole(props) {
    var _this;

    _classCallCheck(this, SideConsole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SideConsole).call(this, props));
    _this.state = {
      width: "0%"
    };
    _this.toggleExpand = _this.toggleExpand.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SideConsole, [{
    key: "toggleExpand",
    value: function toggleExpand() {
      if (this.state.width == "0%") {
        this.setState({
          width: "30%"
        });
      } else {
        this.setState({
          width: "0%"
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "sideConsoleID",
        className: "sideConsole",
        style: {
          width: this.state.width
        }
      }, React.createElement("div", {
        className: "consoleHeader"
      }, React.createElement("a", {
        href: "#",
        onClick: this.toggleExpand
      }, React.createElement("i", {
        className: "fas fa-terminal fa-2x",
        id: "consoleIcon"
      }))), React.createElement("div", {
        className: "consoleOutput"
      }, "Filler"), React.createElement("div", {
        className: "consoleForm"
      }, React.createElement("form", {
        className: "form-inline"
      }, React.createElement("input", {
        type: "text",
        className: "form-control ",
        id: "consoleInput",
        placeholder: "For developers only!"
      }), React.createElement("button", {
        type: "submit",
        className: "btn btn-secondary"
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
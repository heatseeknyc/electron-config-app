'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    _this.toggleExpand = _this.toggleExpand.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleWrite = _this.handleWrite.bind(_assertThisInitialized(_this));
    _this.state = {
      width: "0%",
      msg: ""
    };
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
    key: "handleChange",
    value: function handleChange(e) {
      this.setState({
        msg: e.target.value
      });
    }
  }, {
    key: "handleWrite",
    value: function handleWrite(e) {
      e.preventDefault();
      this.props.writePort(this.state.msg);
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
      }, this.props['buffer'].split('\n').map(function (serialIn) {
        return React.createElement(React.Fragment, null, " ", serialIn, " ", React.createElement("br", null), " ");
      })), React.createElement("div", {
        className: "consoleForm"
      }, React.createElement("form", {
        className: "form-inline"
      }, React.createElement("input", {
        type: "text",
        className: "form-control ",
        id: "consoleInput",
        placeholder: "For developers only!",
        onChange: this.handleChange
      }), React.createElement("button", {
        type: "submit",
        className: "btn btn-secondary",
        onClick: this.handleWrite
      }, ">"))));
    }
  }]);

  return SideConsole;
}(React.Component);

var Starter =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Starter, _React$Component3);

  function Starter(props) {
    var _this2;

    _classCallCheck(this, Starter);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Starter).call(this, props));
    _this2.handleConnect = _this2.handleConnect.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(Starter, [{
    key: "handleConnect",
    value: function handleConnect(e) {
      // Prevent form submission
      e.preventDefault(); // Tell parent to connect

      this.props.findAndConnect();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", null, React.createElement("label", {
        htmlFor: "plugCheck"
      }, "You should've received a Heat Seek Temperature Sensor and a USB cable. Plug in the end of the cable that looks like a phone charger to the side of the sensor. Plug in the other end to your computer. Open the top of the plastic case and press the small reset button on the top."), React.createElement("button", {
        className: "btn btn-primary",
        onClick: this.handleConnect
      }, "I did it!"));
    }
  }]);

  return Starter;
}(React.Component);

var App =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App(props) {
    var _this3;

    _classCallCheck(this, App);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this3.connectPort = _this3.connectPort.bind(_assertThisInitialized(_this3));
    _this3.findAndConnect = _this3.findAndConnect.bind(_assertThisInitialized(_this3));
    _this3.writePort = _this3.writePort.bind(_assertThisInitialized(_this3));
    _this3.state = {
      deviceConnect: false,
      portName: "",
      port: null,
      step: 0.0,
      buffer: ""
    };
    return _this3;
  }

  _createClass(App, [{
    key: "connectPort",
    value: function connectPort(foundPortName) {
      var _this4 = this;

      var openPort = new SerialPort(foundPortName, {
        baudRate: 9600
      });
      openPort.on('data', function (chunk) {
        var chunkStr = String.fromCharCode.apply(String, _toConsumableArray(chunk));
        var before = _this4.state['buffer'];
        before += chunkStr;

        _this4.setState({
          buffer: before
        });
      });
      this.setState({
        deviceConnect: true,
        portName: foundPortName,
        port: openPort
      });
    }
  }, {
    key: "findAndConnect",
    value: function findAndConnect() {
      var _this5 = this;

      var pr = new Promise(function (resolve, reject) {
        SerialPort.list().then(function (ports) {
          ports.forEach(function (port) {
            var pm = port['manufacturer'];

            if (typeof pm !== 'undefined' && pm.includes('Adafruit')) {
              _this5.connectPort(port.comName.toString());

              resolve();
            }
          });
          reject("No sensor port found");
        }, function (err) {
          return console.err(err);
        });
      });
      pr.then(function (resolve) {
        _this5.setState({
          step: 1.0
        });
      }, function (err) {
        _this5.setState({
          step: 1.1
        });
      });
    }
  }, {
    key: "writePort",
    value: function writePort(msg) {
      var before = this.state['buffer'];
      before += "> " + msg;
      this.setState({
        buffer: before
      });

      if (this.state['deviceConnect'] == true) {
        this.state["port"].write(msg);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var instructions;

      if (this.state['step'] == 0.0) {
        // Starting Instructions
        instructions = React.createElement(Starter, {
          findAndConnect: this.findAndConnect
        });
      }

      if (this.state['step'] == 1.0) {
        // Device Found
        instructions = React.createElement("h1", null, " found ");
      }

      if (this.state['step'] == 1.1) {
        // Device not found
        instructions = React.createElement("h1", null, " not found ");
      }

      return React.createElement("div", null, React.createElement(NavBar, null), React.createElement(SideConsole, {
        buffer: this.state['buffer'],
        writePort: this.writePort
      }), instructions);
    }
  }]);

  return App;
}(React.Component);

;
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
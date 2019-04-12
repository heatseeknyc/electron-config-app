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
      this.setState({
        msg: ""
      });
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
        onChange: this.handleChange,
        value: this.state.msg
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
      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("form", null, React.createElement("label", {
        htmlFor: "plugCheck"
      }, "You should've received a Heat Seek Temperature Sensor and a USB cable."), React.createElement("button", {
        className: "btn btn-primary",
        onClick: this.handleConnect
      }, "I did it!")));
    }
  }]);

  return Starter;
}(React.Component);

var Tester =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(Tester, _React$Component4);

  function Tester(props) {
    var _this3;

    _classCallCheck(this, Tester);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Tester).call(this, props));
    _this3.handleTest = _this3.handleTest.bind(_assertThisInitialized(_this3));
    _this3.enableButton = _this3.enableButton.bind(_assertThisInitialized(_this3));
    _this3.state = {
      enabled: false,
      delay: 5
    };
    return _this3;
  }

  _createClass(Tester, [{
    key: "handleTest",
    value: function handleTest(e) {
      e.preventDefault();
      this.props.testConnection(); //TODO/
    }
  }, {
    key: "enableButton",
    value: function enableButton() {
      var _this4 = this;

      if (this.state['delay'] > 0) {
        setTimeout(function () {
          _this4.setState({
            delay: _this4.state['delay'] - 1
          });
        }, 1000);
      } else {
        this.setState({
          enabled: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var button; // Delay is decremented either in 5 seconds, or if incoming message appears

      if (!this.state['enabled']) {
        this.enableButton();
        var button = React.createElement("button", {
          className: "btn disabled"
        }, "Wait ", this.state['delay'], "...");
      } else {
        var button = React.createElement("button", {
          className: "btn btn-primary",
          onClick: this.handleTest
        }, "Continue");
      }

      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("form", null, React.createElement("label", {
        htmlFor: "plugCheck"
      }, "We will now test your connection with the sensor."), React.createElement("br", null), button));
    }
  }]);

  return Tester;
}(React.Component);

var SetupWifi =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(SetupWifi, _React$Component5);

  function SetupWifi(props) {
    var _this5;

    _classCallCheck(this, SetupWifi);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(SetupWifi).call(this, props));
    _this5.handleSSIDChange = _this5.handleSSIDChange.bind(_assertThisInitialized(_this5));
    _this5.handlePwdChange = _this5.handlePwdChange.bind(_assertThisInitialized(_this5));
    _this5.handleRadioChange = _this5.handleRadioChange.bind(_assertThisInitialized(_this5));
    _this5.handleClick = _this5.handleClick.bind(_assertThisInitialized(_this5));
    _this5.state = {
      ssid: '',
      pwd: '',
      selectedOption: ''
    };
    return _this5;
  }

  _createClass(SetupWifi, [{
    key: "handleSSIDChange",
    value: function handleSSIDChange(e) {
      this.setState({
        ssid: e.target.value
      });
    }
  }, {
    key: "handlePwdChange",
    value: function handlePwdChange(e) {
      this.setState({
        pwd: e.target.value
      });
    }
  }, {
    key: "handleRadioChange",
    value: function handleRadioChange(e) {
      this.setState({
        selectedOption: e.target.value
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();
      this.props.setupWifi(this.state);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", null, React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", {
        htmlFor: "wifiSSID"
      }, "Let's set up your wifi. Enter the exact name of your wifi network."), React.createElement("input", {
        type: "text",
        className: "form-control ",
        id: "wifiSSID",
        onChange: this.handleSSIDChange,
        value: this.state['ssid'],
        required: true
      })), React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", {
        htmlFor: "wifiPass"
      }, "Enter your wifi password."), React.createElement("input", {
        type: "password",
        className: "form-control",
        id: "wifiPass",
        onChange: this.handlePwdChange,
        value: this.state['pwd'],
        required: true
      })), React.createElement("div", {
        "class": "form-group"
      }, React.createElement("label", null, "Are you Human?"), React.createElement("div", {
        "class": "form-check"
      }, React.createElement("input", {
        className: "form-check-input",
        type: "radio",
        id: "live",
        value: "live",
        name: "liveOrTest",
        checked: this.state.selectedOption == 'live',
        onChange: this.handleRadioChange
      }), React.createElement("label", {
        className: "form-check-label",
        htmlFor: "live"
      }, "Yes!")), React.createElement("div", {
        "class": "form-check"
      }, React.createElement("input", {
        className: "form-check-input",
        type: "radio",
        id: "test",
        value: "test",
        name: "liveOrTest",
        checked: this.state.selectedOption == 'test',
        onChange: this.handleRadioChange
      }), React.createElement("label", {
        className: "form-check-label",
        htmlFor: "test"
      }, "No."))), React.createElement("button", {
        type: "submit",
        className: "btn btn-primary",
        onClick: this.handleClick
      }, "Connect!"));
    }
  }]);

  return SetupWifi;
}(React.Component);

var App =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(App, _React$Component6);

  function App(props) {
    var _this6;

    _classCallCheck(this, App);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this6.connectPort = _this6.connectPort.bind(_assertThisInitialized(_this6));
    _this6.findAndConnect = _this6.findAndConnect.bind(_assertThisInitialized(_this6));
    _this6.writePort = _this6.writePort.bind(_assertThisInitialized(_this6));
    _this6.testConnection = _this6.testConnection.bind(_assertThisInitialized(_this6));
    _this6.state = {
      deviceConnect: false,
      portName: "",
      port: null,
      step: 0.0,
      buffer: ""
    };
    return _this6;
  }

  _createClass(App, [{
    key: "connectPort",
    value: function connectPort(foundPortName) {
      var _this7 = this;

      var openPort = new SerialPort(foundPortName, {
        baudRate: 9600
      });
      openPort.on('data', function (chunk) {
        var chunkStr = String.fromCharCode.apply(String, _toConsumableArray(chunk));
        var before = _this7.state['buffer'];
        before += chunkStr;

        _this7.setState({
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
      var _this8 = this;

      var pr = new Promise(function (resolve, reject) {
        SerialPort.list().then(function (ports) {
          var portFlag;
          ports.forEach(function (port) {
            var pm = port['manufacturer'];

            if (typeof pm !== 'undefined' && pm.includes('Adafruit')) {
              _this8.connectPort(port.comName.toString());

              resolve();
            }
          }); // this is fine, forEach is blocking.

          reject("No sensor port found");
        }, function (err) {
          return console.err(err);
        });
      });
      pr.then(function (resolve) {
        _this8.setState({
          step: 1.0
        });
      }, function (err) {
        _this8.setState({
          step: 1.1
        });
      });
    }
  }, {
    key: "writePort",
    value: function writePort(msg) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        var before = _this9.state['buffer'];
        before += "> " + msg + "\n";

        _this9.setState({
          buffer: before
        });

        if (_this9.state['deviceConnect'] == true) {
          console.log("writing " + msg); // Arduino code expects newline at the end of msg.

          _this9.state['port'].write(msg + '\n');

          resolve();
        } else {
          reject("No device connected");
        }
      });
    }
  }, {
    key: "testConnection",
    value: function testConnection() {
      var _this10 = this;

      // Test if we can currently enter the menu
      var pr = new Promise(function (resolve, reject) {
        var i = 0;

        var msgList = _this10.state['buffer'].split('\n');

        var bufLength = msgList.length;
        console.log(bufLength);

        while (i < 5 && i < bufLength) {
          if (msgList[i].includes("'C'")) {
            resolve();
          }

          i++;
        } // while is blocking, this is fine


        reject("No menu prompt found");
      });
      pr.then(function (resolve) {
        // Enter menu and enter wifi setup
        _this10.writePort("C").then(function (resolve) {
          setTimeout(function () {
            _this10.writePort("w");
          }, 2000);
        });

        _this10.setState({
          step: 2.0
        });
      }, function (err) {
        _this10.setState({
          step: 2.1
        });
      });
    }
  }, {
    key: "setupWifi",
    value: function setupWifi(wifiState) {
      console.log(wifiState);
    }
  }, {
    key: "render",
    value: function render() {
      var instructions;

      switch (this.state['step']) {
        case 0.0:
          // Starting Instructions
          instructions = React.createElement(Starter, {
            findAndConnect: this.findAndConnect
          });
          break;

        case 1.0:
          // Device Found
          instructions = React.createElement(Tester, {
            testConnection: this.testConnection
          });
          break;

        case 1.1:
          // Device not found
          instructions = React.createElement("h1", null, " Device not found. Reconnect and ctrl-R or cmd-R ");
          break;

        case 2.0:
          instructions = React.createElement(SetupWifi, {
            setupWifi: this.setupWifi
          });
          break;

        case 2.1:
          instructions = React.createElement("h1", null, " Sensor needs to be reset. ");
          break;

        default:
          instructions = React.createElement("h1", null, " Unexpected step ", this.state['step'], " ");
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
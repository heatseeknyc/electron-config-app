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
    // Navigation bar component
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

  // Side console component
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
          width: "40%"
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
      // React controlled form for cmd
      this.setState({
        msg: e.target.value
      });
    }
  }, {
    key: "handleWrite",
    value: function handleWrite(e) {
      // button to send custom cmd to arduino
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

  // First welcome screen component
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
      e.preventDefault(); // Tell App to connect to arduino

      this.props.findAndConnect();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("h1", null, " SETUP YOUR SENSOR "), React.createElement("form", null, React.createElement("label", null, "Let's get started with your sensor!", React.createElement("br", null), "You should've received the following:", React.createElement("ul", null, React.createElement("li", null, " A HeatSeek sensor "), React.createElement("li", null, " Charging cable and power plug "), React.createElement("li", null, " A reset pin ")), "Connect the sensor to your computer with the provided cable."), React.createElement("br", null), React.createElement("button", {
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

  // Second connection test component
  function Tester(props) {
    var _this3;

    _classCallCheck(this, Tester);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Tester).call(this, props));
    _this3.runTest = _this3.runTest.bind(_assertThisInitialized(_this3));
    _this3.state = {
      tested: false
    };
    return _this3;
  }

  _createClass(Tester, [{
    key: "runTest",
    value: function runTest() {
      // Tell App to check if arduino can go into 'c' menu
      if (!this.state['tested']) {
        this.props.testConnection();
        this.setState({
          tested: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.runTest();
      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("h1", null, " CONNECTING... "), React.createElement("form", null, React.createElement("label", null, "Please wait while we connect."), React.createElement("br", null), React.createElement("div", {
        className: "spinner-border text-primary",
        role: "status"
      }, React.createElement("span", {
        className: "sr-only"
      }, " Loading... "))));
    }
  }]);

  return Tester;
}(React.Component);

var TestSuccess =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(TestSuccess, _React$Component5);

  // Connection test success component
  function TestSuccess(props) {
    var _this4;

    _classCallCheck(this, TestSuccess);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(TestSuccess).call(this, props));
    _this4.goNext = _this4.goNext.bind(_assertThisInitialized(_this4));
    _this4.state = {
      nexted: false
    };
    return _this4;
  }

  _createClass(TestSuccess, [{
    key: "goNext",
    value: function goNext() {
      // Go to wifi setup 
      if (!this.state['nexted']) {
        this.props.gotoWifi();
        this.setState({
          nexted: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.goNext();
      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("h1", null, " CONNECTED "), React.createElement("form", null, React.createElement("label", null, "Sensor successfully connected."), React.createElement("br", null), React.createElement("i", {
        className: "fas fa-check-circle fa-2x green"
      })));
    }
  }]);

  return TestSuccess;
}(React.Component);

var SetupWifi =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(SetupWifi, _React$Component6);

  // Wifi setup component
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
      selectedOption: '',
      submitted: false
    };
    return _this5;
  }

  _createClass(SetupWifi, [{
    key: "handleSSIDChange",
    value: function handleSSIDChange(e) {
      // React controlled field for SSID
      this.setState({
        ssid: e.target.value
      });
    }
  }, {
    key: "handlePwdChange",
    value: function handlePwdChange(e) {
      // React controlled field for PWD
      this.setState({
        pwd: e.target.value
      });
    }
  }, {
    key: "handleRadioChange",
    value: function handleRadioChange(e) {
      // React controlled field for 3600/3700
      this.setState({
        selectedOption: e.target.value
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      // Form submission - write to arduino
      e.preventDefault();
      this.props.setupWifi(this.state);
      this.setState({
        submitted: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var button;

      if (!this.state['submitted']) {
        button = React.createElement("button", {
          type: "submit",
          className: "btn btn-primary",
          onClick: this.handleClick
        }, "Connect!");
      } else {
        button = React.createElement("button", {
          className: "btn btn-primary",
          disabled: true
        }, "Working...");
      }

      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("h1", null, " SETUP WIFI "), React.createElement("form", null, React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", {
        htmlFor: "wifiSSID"
      }, "Please enter the exact name of your Wi-Fi network (case sensitive)."), React.createElement("input", {
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
      }, "Please enter your Wi-Fi password."), React.createElement("input", {
        type: "password",
        className: "form-control",
        id: "wifiPass",
        onChange: this.handlePwdChange,
        value: this.state['pwd'],
        required: true
      })), React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", null, "Are you human?"), React.createElement("div", {
        className: "form-check"
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
        className: "form-check"
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
      }, "No."))), button));
    }
  }]);

  return SetupWifi;
}(React.Component);

var ShowError =
/*#__PURE__*/
function (_React$Component7) {
  _inherits(ShowError, _React$Component7);

  // Error display component
  function ShowError(props) {
    var _this6;

    _classCallCheck(this, ShowError);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(ShowError).call(this, props));
    _this6.handleReload = _this6.handleReload.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(ShowError, [{
    key: "handleReload",
    value: function handleReload(e) {
      // Prevent form submission
      e.preventDefault(); // Tell App to refresh

      window.location.reload();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("h1", null, " ERROR "), React.createElement("form", null, React.createElement("label", null, "We were unable to setup your sensor. Please do the following.", React.createElement("br", null), React.createElement("ol", null, React.createElement("li", null, " Open the sensor and press the reset button. "), React.createElement("li", null, " Disconnect the cable and reconnect it. "), React.createElement("li", null, " ", React.createElement("button", {
        className: "btn btn-primary",
        onClick: this.handleReload
      }, "Try again!"), " ")), "Error reason: ", this.props.reason)));
    }
  }]);

  return ShowError;
}(React.Component);

var ShowSuccess =
/*#__PURE__*/
function (_React$Component8) {
  _inherits(ShowSuccess, _React$Component8);

  // Final success display component
  function ShowSuccess(props) {
    _classCallCheck(this, ShowSuccess);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowSuccess).call(this, props));
  }

  _createClass(ShowSuccess, [{
    key: "handleReload",
    value: function handleReload(e) {
      // Prevent form submission
      e.preventDefault(); // Tell App to refresh

      window.location.reload();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "instructions"
      }, React.createElement("h1", null, " SUCCESS "), React.createElement("form", null, React.createElement("label", null, "Your sensor has been successfully setup!", React.createElement("br", null), "Disconnect the sensor from the computer and plug in the cable to the charging plug.", React.createElement("br", null), React.createElement("button", {
        className: "btn btn-primary",
        onClick: this.handleReload
      }, "Start over!"))));
    }
  }]);

  return ShowSuccess;
}(React.Component);

var App =
/*#__PURE__*/
function (_React$Component9) {
  _inherits(App, _React$Component9);

  // Overall app component
  function App(props) {
    var _this7;

    _classCallCheck(this, App);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this7.connectPort = _this7.connectPort.bind(_assertThisInitialized(_this7));
    _this7.findAndConnect = _this7.findAndConnect.bind(_assertThisInitialized(_this7));
    _this7.writePort = _this7.writePort.bind(_assertThisInitialized(_this7));
    _this7.testConnection = _this7.testConnection.bind(_assertThisInitialized(_this7));
    _this7.setupWifi = _this7.setupWifi.bind(_assertThisInitialized(_this7));
    _this7.delayAndCheck = _this7.delayAndCheck.bind(_assertThisInitialized(_this7));
    _this7.gotoWifi = _this7.gotoWifi.bind(_assertThisInitialized(_this7));
    _this7.state = {
      deviceConnect: false,
      portName: "",
      port: null,
      step: 0.0,
      buffer: "",
      errMsg: ""
    };
    return _this7;
  }

  _createClass(App, [{
    key: "delayAndCheck",
    value: function delayAndCheck(duration, token) {
      var _this8 = this;

      // Waits [duration] seconds then checks if LAST message contains [token]
      var delay = function delay(t) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, t);
        });
      };

      return delay(duration).then(function (resolve) {
        return new Promise(function (resolve, reject) {
          // Split by newline to access last line sent from arduino
          var msgList = _this8.state['buffer'].split('\n');

          var bufLength = msgList.length; // bufLength-2 because the last item in the list is always None

          if (msgList[bufLength - 2].includes(token)) {
            resolve();
          } else {
            reject("token '" + token + "' not found in sensor output");
          }
        });
      });
    }
  }, {
    key: "connectPort",
    value: function connectPort(foundPortName) {
      var _this9 = this;

      // connect to a given port name
      var openPort = new SerialPort(foundPortName, {
        baudRate: 9600
      });
      openPort.on('data', function (chunk) {
        // every time data is received, append it to the state so
        // sidebar console can be updated
        var chunkStr = String.fromCharCode.apply(String, _toConsumableArray(chunk));
        var before = _this9.state['buffer'];
        before += chunkStr;

        _this9.setState({
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
      var _this10 = this;

      // find a device on serial ports with manufacturer 'Adafruit'
      // and connect to said serial port
      var pr = new Promise(function (resolve, reject) {
        SerialPort.list().then(function (ports) {
          ports.forEach(function (port) {
            var pm = port['manufacturer'];
            var vid = port['vendorId'];

            if (typeof pm !== 'undefined' && pm.includes('Adafruit')) {
              _this10.connectPort(port.comName.toString());

              resolve();
            } else if (typeof vid !== 'undefined' && vid.includes('239A')) {
              _this10.connectPort(port.comName.toString());

              resolve();
            }
          }); // this is fine, forEach is blocking.

          reject("No sensor port found");
        }, function (err) {
          return console.err(err);
        });
      });
      pr.then(function (resolve) {
        _this10.setState({
          step: 1.0
        });
      }, function (err) {
        _this10.setState({
          step: 1.1
        });
      });
    }
  }, {
    key: "writePort",
    value: function writePort(msg) {
      var _this11 = this;

      // write a message to the currently connected port
      return new Promise(function (resolve, reject) {
        var before = _this11.state['buffer'];
        before += "> " + msg + "\n";

        _this11.setState({
          buffer: before
        });

        if (_this11.state['deviceConnect'] == true) {
          console.log("writing " + msg); // Arduino code expects newline at the end of msg.

          _this11.state['port'].write(msg + '\n');

          resolve();
        } else {
          reject("No device connected");
        }
      });
    }
  }, {
    key: "testConnection",
    value: function testConnection() {
      var _this12 = this;

      // Check if arduino is ready to enter the menu
      // if it is, send 'C' to enter it
      this.delayAndCheck(3000, "C").then(function (resolve) {
        // Enter menu and enter wifi setup
        _this12.writePort("C");

        _this12.setState({
          step: 1.2
        });
      }, function (err) {
        _this12.setState({
          step: 2.1
        });
      });
    }
  }, {
    key: "gotoWifi",
    value: function gotoWifi() {
      var _this13 = this;

      // Transition after 3 seconds from connection success to wifi setup
      var delay = function delay(t) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, t);
        });
      };

      delay(3000).then(function (resolve) {
        _this13.setState({
          step: 2.0
        });
      });
    }
  }, {
    key: "setupWifi",
    value: function setupWifi(wifiState) {
      var _this14 = this;

      // Program arduino with wifi information
      console.log(wifiState);

      var delay = function delay(t) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, t);
        });
      };

      var rejPromise = function rejPromise(reason) {
        return new Promise(function (resolve, reject) {
          return reject(reason);
        });
      }; // Any error during this Promise chain is immediately propagated
      // to the end to be displayed


      this.writePort("w") // enter wifi setup
      .then(function (resolve) {
        // wait for arduino to ask for SSID
        return _this14.delayAndCheck(3000, "Enter WiFi SSID");
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // write SSID
        return _this14.writePort(wifiState['ssid']);
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // wait for arduino to ask for pwd
        return _this14.delayAndCheck(3000, "Enter WiFi password");
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // write pwd
        return _this14.writePort(wifiState['pwd']);
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // wait for arduino to redisplay menu
        return _this14.delayAndCheck(3000, "[s]");
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // enter interval setup
        return _this14.writePort('r');
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // wait for arduino to ask for interval
        return _this14.delayAndCheck(3000, "Enter Reading interval in seconds");
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // write appropriate interval
        if (wifiState['selectedOption'] == 'test') {
          return _this14.writePort('3700');
        } else {
          return _this14.writePort('3600');
        }
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // wait for arduino to redisplay menu
        return _this14.delayAndCheck(3000, "[s]");
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // exit menu
        return _this14.writePort('s');
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // wait for arduino to connect to the wifi
        return delay(7000).then(function (resolve) {
          return new Promise(function (resolve, reject) {
            if (_this14.state['buffer'].includes("Connected to WiFi")) {
              resolve();
            } else {
              reject("token 'Connected to WiFi' not found in sensor output");
            }
          });
        });
      }, function (err) {
        console.log(err);
        return rejPromise(err);
      }).then(function (resolve) {
        // change state appropriately
        _this14.setState({
          step: 3.0
        });
      }, function (err) {
        _this14.setState({
          step: 3.1,
          errMsg: err
        });
      });
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
          instructions = React.createElement(ShowError, {
            reason: "Device port not found."
          });
          break;

        case 1.2:
          // Device found AND connected
          instructions = React.createElement(TestSuccess, {
            gotoWifi: this.gotoWifi
          });
          break;

        case 2.0:
          // Setup Wifi
          instructions = React.createElement(SetupWifi, {
            setupWifi: this.setupWifi
          });
          break;

        case 2.1:
          // Error, device needs to be reset
          instructions = React.createElement(ShowError, {
            reason: "Device not ready to enter menu."
          });
          break;

        case 3.0:
          // Done!
          instructions = React.createElement(ShowSuccess, null);
          break;

        case 3.1:
          // Error during WiFi setup
          instructions = React.createElement(ShowError, {
            reason: this.state['errMsg']
          });
          break;

        default:
          // This should never happen but... just in case
          instructions = React.createElement(ShowError, {
            reason: "Unexpected step " + this.state['errMsg']
          });
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
'use strict';
const React = require("react");
const ReactDOM = require("react-dom");
const SerialPort = require("serialport");

SerialPort.list().then(
	ports => ports.forEach(console.log),
	err => console.error(err)
)

class NavBar extends React.Component {
	// Navigation bar component
	render() {
		return (
			<nav className="navbar navbar-light bg-light">
				<a className="navbar-brand" href="https://heatseek.org/">
					<img src="contents/img/heat_seek-logo-@2x-tp.png" height="45" className="d-inline-block align-top" />
				</a>
			</nav>
		);
	}
};

class SideConsole extends React.Component {
	// Side console component
	constructor(props) {
		super(props);
		this.toggleExpand = this.toggleExpand.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleWrite = this.handleWrite.bind(this);
		this.state = {width: "0%", msg: ""};
	}
	toggleExpand() {
		if (this.state.width == "0%"){
			this.setState({width: "40%"});
		}else{
			this.setState({width: "0%"});
		}
	}
	handleChange(e) {
		// React controlled form for cmd
		this.setState({msg: e.target.value});
	}
	handleWrite(e) {
		// button to send custom cmd to arduino
		e.preventDefault();
		this.props.writePort(this.state.msg);
		this.setState({msg: ""});
	}
	render() {
		return (
			<div id="sideConsoleID" className="sideConsole" style={{width:this.state.width}}>
				<div className="consoleHeader">
					<a href="#" onClick={this.toggleExpand}><i className="fas fa-terminal fa-2x" id="consoleIcon"></i></a>
				</div>
				<div className="consoleOutput">
					{this.props['buffer'].split('\n').map((serialIn) => {
						return ( <React.Fragment> {serialIn} <br /> </React.Fragment>);
					})}
				</div>
				<div className="consoleForm">
					<form className="form-inline">
						<input type="text" className="form-control " id="consoleInput" placeholder="For developers only!" onChange={this.handleChange} value={this.state.msg}/>
						<button type="submit" className="btn btn-secondary" onClick={this.handleWrite}>></button>
					</form>
				</div>
			</div>
		);
	}
}

class Starter extends React.Component {
	// First welcome screen component
	constructor(props) {
		super(props);
		this.handleConnect = this.handleConnect.bind(this);
	}
	handleConnect(e) {
		// Prevent form submission
		e.preventDefault();
		// Tell App to connect to arduino
		this.props.findAndConnect()
	}
	render() {
		return(
			<div className="instructions">
			<h1> SETUP YOUR SENSOR </h1>
			<form>
				<label>
				Let's get started with your sensor!
				<br />
				You should've received the following:
				<ul>
					<li> A HeatSeek sensor </li>
					<li> Charging cable and power plug </li>
					<li> A reset pin </li>
				</ul>
				Connect the sensor to your computer with the provided cable. 
				</label>
				<br />
				<button className="btn btn-primary" onClick={this.handleConnect}>I did it!</button>
			</form>
			</div>
		);
	}
}

class Tester extends React.Component {
	// Second connection test component
	constructor(props) {
		super(props);
		this.runTest = this.runTest.bind(this);
		this.state = {tested:false};
	}
	runTest() {
		// Tell App to check if arduino can go into 'c' menu
		if(!this.state['tested']){
			this.props.testConnection();
			this.setState({tested:true});
		}
		
	}
	render() {
		this.runTest();
		return(
			<div className="instructions">
			<h1> CONNECTING... </h1>
			<form>
				<label>
				Please wait while we connect.
				</label>
				<br />
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only"> Loading... </span>
				</div>
			</form>
			</div>
		);
	}
}

class TestSuccess extends React.Component {
	// Connection test success component
	constructor(props) {
		super(props);
		this.goNext = this.goNext.bind(this);
		this.state = {nexted:false};
	}
	goNext() {
		// Go to wifi setup 
		if(!this.state['nexted']){
			this.props.gotoWifi();
			this.setState({nexted:true});
		}
	}
	render() {
		this.goNext();
		return(
			<div className="instructions">
			<h1> CONNECTED </h1>
			<form>
				<label>
				Sensor successfully connected.
				</label>
				<br />
				<i className="fas fa-check-circle fa-2x green"></i>
			</form>
			</div>
		);
	}
}

class SetupWifi extends React.Component {
	// Wifi setup component
	constructor(props) {
		super(props);
		this.handleSSIDChange = this.handleSSIDChange.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {ssid:'', pwd:'', selectedOption:'', submitted:false};
	}
	handleSSIDChange(e) {
		// React controlled field for SSID
		this.setState({ssid: e.target.value});
	}
	handlePwdChange(e) {
		// React controlled field for PWD
		this.setState({pwd: e.target.value});
	}
	handleRadioChange(e) {
		// React controlled field for 3600/3700
		this.setState({selectedOption: e.target.value});
	}
	handleClick(e) {
		// Form submission - write to arduino
		e.preventDefault();
		this.props.setupWifi(this.state);
		this.setState({submitted:true});
	}
	render() {
		var button;
		if(!this.state['submitted']){
			button = <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Connect!</button>
		} else{
			button = <button className="btn btn-primary" disabled>Working...</button>
		}
		return (
			<div className="instructions">
			<h1> SETUP WIFI </h1>
			<form>
				<div className="form-group">
					<label htmlFor="wifiSSID">
					Please enter the exact name of your Wi-Fi network (case sensitive).
					</label>
					<input type="text" className="form-control " id="wifiSSID" onChange={this.handleSSIDChange} value={this.state['ssid']} required />
				</div>

				<div className="form-group">
					<label htmlFor="wifiPass">
					Please enter your Wi-Fi password.
					</label>
					<input type="password" className="form-control" id="wifiPass" onChange={this.handlePwdChange} value={this.state['pwd']} required />
				</div>

				<div className="form-group">
					<label>
					Are you human?
					</label>
					<div className="form-check">
						<input className="form-check-input" type="radio" id="live" value="live" name="liveOrTest" checked={this.state.selectedOption == 'live'} onChange={this.handleRadioChange} />
						<label className="form-check-label" htmlFor="live">
							Yes!
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="radio" id="test" value="test" name="liveOrTest" checked={this.state.selectedOption == 'test'} onChange={this.handleRadioChange} />
						<label className="form-check-label" htmlFor="test">
							No.
						</label>
					</div>
				</div>
				{button}
			</form>
			</div>
		);
	}
}

class ShowError extends React.Component {
	// Error display component
	constructor(props) {
		super(props);
		this.handleReload = this.handleReload.bind(this);
	}
	handleReload(e) {
		// Prevent form submission
		e.preventDefault();
		// Tell App to refresh
		window.location.reload();
	}
	render() {
		return(
			<div className="instructions">
			<h1> ERROR </h1>
			<form>
				<label>
				We were unable to setup your sensor. Please do the following.
				<br/>
				<ol>
					<li> Open the sensor and press the reset button. </li>
					<li> Disconnect the cable and reconnect it. </li>
					<li> <button className="btn btn-primary" onClick={this.handleReload}>Try again!</button> </li>
				</ol>
				Error reason: {this.props.reason}
				</label>
			</form>
			</div>
		);
	}
}

class ShowSuccess extends React.Component {
	// Final success display component
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="instructions">
			<h1> SUCCESS </h1>
			<form>
				<label>
				Your sensor has been successfully setup!
				<br/>
				Disconnect the sensor from the computer and plug in the cable to the charging plug.
				</label>
			</form>
			</div>
		);
	}
}

class App extends React.Component {
	// Overall app component
	constructor(props) {
		super(props);
		this.connectPort = this.connectPort.bind(this);
		this.findAndConnect = this.findAndConnect.bind(this);
		this.writePort = this.writePort.bind(this);
		this.testConnection = this.testConnection.bind(this);
		this.setupWifi = this.setupWifi.bind(this);
		this.delayAndCheck = this.delayAndCheck.bind(this);
		this.gotoWifi = this.gotoWifi.bind(this);

		this.state = {
			deviceConnect: false,
			portName: "",
			port: null,
			step: 0.0,
			buffer: "",
			errMsg: ""
		};
	}
	delayAndCheck(duration, token) {
		// Waits [duration] seconds then checks if LAST message contains [token]
		const delay = t => new Promise(resolve => setTimeout(resolve, t));
		return delay(duration).then(resolve => {
			return new Promise((resolve, reject) => {
				// Split by newline to access last line sent from arduino
				var msgList = this.state['buffer'].split('\n');
				var bufLength = msgList.length;
				// bufLength-2 because the last item in the list is always None
				if(msgList[bufLength-2].includes(token)){
					resolve();
				}else{
					reject("token '"+token+"' not found in sensor output");
				}
			});
		});
	}
	connectPort(foundPortName) {
		// connect to a given port name
		const openPort = new SerialPort(foundPortName, {
			baudRate: 9600
		});
		openPort.on('data', chunk => {
			// every time data is received, append it to the state so
			// sidebar console can be updated
			var chunkStr = String.fromCharCode(...chunk);
			var before = this.state['buffer'];
			before += chunkStr;
			this.setState({buffer:before});
		});
		this.setState({
			deviceConnect: true,
			portName: foundPortName,
			port: openPort
		});
	}
	findAndConnect() {
		// find a device on serial ports with manufacturer 'Adafruit'
		// and connect to said serial port
		var pr = new Promise((resolve, reject) => {
			SerialPort.list().then(
				ports => {
					ports.forEach(port => {
						var pm = port['manufacturer'];
						if(typeof pm !== 'undefined' && pm.includes('Adafruit')){
							this.connectPort(port.comName.toString());
							resolve();
						}
					});
					// this is fine, forEach is blocking.
					reject("No sensor port found");
				},
				err => console.err(err)
			)
		});

		pr.then(
			resolve => {
				this.setState({ step:1.0 });
			},
			err => {
				this.setState({ step:1.1 });
			}
		)

	}
	writePort(msg) {
		// write a message to the currently connected port
		return new Promise((resolve, reject) => {
			var before = this.state['buffer'];
			before += ("> " + msg + "\n");
			this.setState({buffer:before});
			if(this.state['deviceConnect'] == true) {
				console.log("writing " + msg);
				// Arduino code expects newline at the end of msg.
				this.state['port'].write(msg+'\n');
				resolve();
			}else{
				reject("No device connected");
			}
		});
	}
	testConnection() {
		// Check if arduino is ready to enter the menu
		// if it is, send 'C' to enter it
		this.delayAndCheck(3000, "C").then(
			resolve => {
				// Enter menu and enter wifi setup
				this.writePort("C");
				this.setState({ step:1.2 });
			},
			err => {
				this.setState({ step:2.1 });
			}
		)
	}
	gotoWifi() {
		// Transition after 3 seconds from connection success to wifi setup
		const delay = t => new Promise(resolve => setTimeout(resolve, t));
		delay(3000).then( resolve => {
			this.setState({ step: 2.0 });
		});
	}
	setupWifi(wifiState) {
		// Program arduino with wifi information
		console.log(wifiState);
		const delay = t => new Promise(resolve => setTimeout(resolve, t));
		const rejPromise = reason => new Promise((resolve, reject) => reject(reason));

		// Any error during this Promise chain is immediately propagated
		// to the end to be displayed
		this.writePort("w")		// enter wifi setup
		.then( resolve => {
			// wait for arduino to ask for SSID
			return this.delayAndCheck(3000, "Enter WiFi SSID");
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// write SSID
			return this.writePort(wifiState['ssid']);
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// wait for arduino to ask for pwd
			return this.delayAndCheck(3000, "Enter WiFi password");
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// write pwd
			return this.writePort(wifiState['pwd']);
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// wait for arduino to redisplay menu
			return this.delayAndCheck(3000, "[s]");
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// enter interval setup
			return this.writePort('r');
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// wait for arduino to ask for interval
			return this.delayAndCheck(3000, "Enter Reading interval in seconds");
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// write appropriate interval
			if(wifiState['selectedOption'] == 'test'){
				return this.writePort('3700');
			}else{
				return this.writePort('3600');
			}
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then ( resolve => {
			// wait for arduino to redisplay menu
			return this.delayAndCheck(3000, "[s]");
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then ( resolve => {
			// exit menu
			return this.writePort('s')
			}, err => { console.log(err); return rejPromise(err);}
		)
		.then( resolve => {
			// wait for arduino to connect to the wifi
			return delay(7000).then(resolve => {
				return new Promise((resolve, reject) => {
					if(this.state['buffer'].includes("Connected to WiFi")){
						resolve();
					}else{
						reject("token 'Connected to WiFi' not found in sensor output");
					}
				});
			});
			}, err => { console.log(err); return rejPromise(err);}

		)
		.then( resolve => {
			// change state appropriately
				this.setState({ step:3.0 });
			}, err => { this.setState({ step:3.1, errMsg:err})}
		);
	}
	render() {
		var instructions;
		switch(this.state['step']) {
			case 0.0:
				// Starting Instructions
				instructions = <Starter findAndConnect={this.findAndConnect} />;
				break;
			case 1.0:
				// Device Found
				instructions = <Tester testConnection={this.testConnection} />;
				break;
			case 1.1:
				// Device not found
				instructions = <ShowError reason={"Device port not found."} />;
				break;
			case 1.2:
				// Device found AND connected
				instructions = <TestSuccess gotoWifi={this.gotoWifi} />;
				break;
			case 2.0:
				// Setup Wifi
				instructions = <SetupWifi setupWifi={this.setupWifi} />;
				break;
			case 2.1:
				// Error, device needs to be reset
				instructions = <ShowError reason={"Device not ready to enter menu."} />;
				break;
			case 3.0:
				// Done!
				instructions = <ShowSuccess />;
				break;
			case 3.1:
				// Error during WiFi setup
				instructions = <ShowError reason={this.state['errMsg']} />;
				break;
			default:
				// This should never happen but... just in case
				instructions = <ShowError reason={"Unexpected step " + this.state['errMsg']} />;
		}
		return(
			<div>
				<NavBar />
				<SideConsole buffer={this.state['buffer']} writePort={this.writePort} />
				{instructions}
			</div>
		);
	}
};

ReactDOM.render(
	< App />,
	document.getElementById('app')
);
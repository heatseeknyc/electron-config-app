'use strict';
const React = require("react");
const ReactDOM = require("react-dom");
const SerialPort = require("serialport");

SerialPort.list().then(
	ports => ports.forEach(console.log),
	err => console.error(err)
)

class NavBar extends React.Component {
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
		this.setState({msg: e.target.value});
	}
	handleWrite(e) {
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
	constructor(props) {
		super(props);
		this.handleConnect = this.handleConnect.bind(this);
	}
	handleConnect(e) {
		// Prevent form submission
		e.preventDefault();
		// Tell parent to connect
		this.props.findAndConnect()
	}
	render() {
		return(
			<div className="instructions">
			<form>
				<label htmlFor="plugCheck">
				You should've received a Heat Seek Temperature Sensor and a USB cable.
				</label>
				<button className="btn btn-primary" onClick={this.handleConnect}>I did it!</button>
			</form>
			</div>
		);
	}
}

class Tester extends React.Component {
	constructor(props) {
		super(props);
		this.handleTest = this.handleTest.bind(this);
		this.enableButton = this.enableButton.bind(this);
		this.state = {enabled:false, delay:5}
	}
	handleTest(e) {
		e.preventDefault();
		this.props.testConnection(); //TODO/
	}
	enableButton() {
		if(this.state['delay'] > 0){
			setTimeout(() => {
				this.setState({delay: this.state['delay'] - 1});
			}, 1000);
		}else{
			this.setState({enabled:true})
		}
	}
	render() {
		var button;
		// Delay is decremented either in 5 seconds, or if incoming message appears
		if(!this.state['enabled']){
			this.enableButton();
			var button = <button className="btn disabled">Wait {this.state['delay']}...</button>;
		}else{
			var button = <button className="btn btn-primary" onClick={this.handleTest}>Continue</button>;
		}
		return(
			<div className="instructions">
			<form>
				<label htmlFor="plugCheck">
				We will now test your connection with the sensor.
				</label>
				<br />
				{button}
			</form>
			</div>
		);
	}
}

class SetupWifi extends React.Component {
	constructor(props) {
		super(props);
		this.handleSSIDChange = this.handleSSIDChange.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {ssid:'', pwd:'', selectedOption:''};
	}
	handleSSIDChange(e) {
		this.setState({ssid: e.target.value});
	}
	handlePwdChange(e) {
		this.setState({pwd: e.target.value});
	}
	handleRadioChange(e) {
		this.setState({selectedOption: e.target.value});
	}
	handleClick(e) {
		e.preventDefault();
		this.props.setupWifi(this.state);
	}
	render() {
		return (
			<div className="instructions">
			<form>
				<div className="form-group">
					<label htmlFor="wifiSSID">
					Let's set up your wifi. Enter the exact name of your wifi network.
					</label>
					<input type="text" className="form-control " id="wifiSSID" onChange={this.handleSSIDChange} value={this.state['ssid']} required />
				</div>

				<div className="form-group">
					<label htmlFor="wifiPass">
					Enter your wifi password.
					</label>
					<input type="password" className="form-control" id="wifiPass" onChange={this.handlePwdChange} value={this.state['pwd']} required />
				</div>

				<div class="form-group">
					<label>
					Are you Human?
					</label>
					<div class="form-check">
						<input className="form-check-input" type="radio" id="live" value="live" name="liveOrTest" checked={this.state.selectedOption == 'live'} onChange={this.handleRadioChange} />
						<label className="form-check-label" htmlFor="live">
							Yes!
						</label>
					</div>
					<div class="form-check">
						<input className="form-check-input" type="radio" id="test" value="test" name="liveOrTest" checked={this.state.selectedOption == 'test'} onChange={this.handleRadioChange} />
						<label className="form-check-label" htmlFor="test">
							No.
						</label>
					</div>
				</div>
				<button type="submit" className="btn btn-primary" onClick={this.handleClick}>Connect!</button>
			</form>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.connectPort = this.connectPort.bind(this);
		this.findAndConnect = this.findAndConnect.bind(this);
		this.writePort = this.writePort.bind(this);
		this.testConnection = this.testConnection.bind(this);
		this.setupWifi = this.setupWifi.bind(this);

		this.state = {
			deviceConnect: false,
			portName: "",
			port: null,
			step: 0.0,
			buffer: ""
		};
	}
	connectPort(foundPortName) {
		const openPort = new SerialPort(foundPortName, {
			baudRate: 9600
		});
		openPort.on('data', chunk => {
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
		var pr = new Promise((resolve, reject) => {
			SerialPort.list().then(
				ports => {
					var portFlag
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
		const delay = t => new Promise(resolve => setTimeout(resolve, t));
		// Test if we can currently enter the menu
		var pr = new Promise((resolve, reject) => {
			var i = 0;
			var msgList = this.state['buffer'].split('\n');
			var bufLength = msgList.length;
			console.log(bufLength)
			while(i < 5 && i < bufLength){
				if(msgList[i].includes("'C'")){
					resolve();
				}
				i++;
			}
			// while is blocking, this is fine
			reject("No menu prompt found");
		});

		pr.then(
			resolve => {
				// Enter menu and enter wifi setup
				this.writePort("C").then( resolve => {
					return delay(2000);
				}).then( resolve => {
					 this.writePort("w");
				});
				this.setState({ step:2.0 });
			},
			err => {
				this.setState({ step:2.1 });
			}
		)
	}
	setupWifi(wifiState) {
		console.log(wifiState);
		const delay = t => new Promise(resolve => setTimeout(resolve, t));
		this.writePort(wifiState['ssid']).then( resolve => {
			return delay(2000);
		}).then( resolve => {
			return this.writePort(wifiState['pwd']);
		}).then( resolve => {
			return delay(2000);
		}).then( resolve => {
			return this.writePort('r');
		}).then( resolve => {
			return delay(2000);
		}).then( resolve => {
			if(wifiState['selectedOption'] == 'live'){
				return this.writePort('3600');
			}else if(wifiState['selectedOption'] == 'test'){
				return this.writePort('3700');
			}
		});
	}
	render() {
		var instructions
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
				instructions = <h1> Device not found. Reconnect and ctrl-R or cmd-R </h1>;
				break;
			case 2.0:
				// Setup Wifi
				instructions = <SetupWifi setupWifi={this.setupWifi} />;
				break;
			case 2.1:
				instructions = <h1> Sensor needs to be reset. </h1>;
				break;
			default:
				instructions = <h1> Unexpected step {this.state['step']} </h1>;
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
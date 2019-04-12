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
			this.setState({width: "30%"});
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
		)
	}
}

class Tester extends React.Component {
	constructor(props) {
		super(props);
		this.handleTest = this.handleTest.bind(this);
	}
	handleTest(e) {
		e.preventDefault();
		this.props.testConnection(); //TODO/
	}
	render() {
		return(
			<div className="instructions">
			<form>
				<label htmlFor="plugCheck">
				We will now test your connection with the sensor.
				</label>
				<button className="btn btn-primary" onClick={this.handleTest}>Continue</button>
			</form>
			</div>
		)
	}
}


class App extends React.Component {
	constructor(props) {
		super(props);
		this.connectPort = this.connectPort.bind(this);
		this.findAndConnect = this.findAndConnect.bind(this);
		this.writePort = this.writePort.bind(this);
		this.testConnection = this.testConnection.bind(this);

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
					ports.forEach(port => {
						var pm = port['manufacturer'];
						if(typeof pm !== 'undefined' && pm.includes('Adafruit')){
							this.connectPort(port.comName.toString());
							resolve();
						}
					});
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
		var before = this.state['buffer'];
		before += ("> " + msg + "\n");
		this.setState({buffer:before});
		if(this.state['deviceConnect'] == true) {
			console.log("writing " + msg);
			// Arduino code expects newline at the end of msg.
			this.state['port'].write(msg+'\n');
		}
	}
	testConnection() {
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
			reject("No menu prompt found");
		});

		pr.then(
			resolve => {
				this.setState({ step:2.0 });
			},
			err => {
				this.setState({ step:2.1 });
			}
		)
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
				instructions = <h1> not found </h1>;
				break;
			case 2.0:
				instructions = <h1> Test Success </h1>;
				break;
			case 2.1:
				instructions = <h1> Test Failure </h1>;
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
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
		this.state = {width: "0%"};
	}
	toggleExpand() {
		if (this.state.width == "0%"){
			this.setState({width: "30%"});
		}else{
			this.setState({width: "0%"});
		}
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
						<input type="text" className="form-control " id="consoleInput" placeholder="For developers only!" />
						<button type="submit" className="btn btn-secondary">></button>
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
			<form>
				<label htmlFor="plugCheck">
				You should've received a Heat Seek Temperature Sensor and a USB cable. Plug in the end of the cable that looks like a phone charger to the side of the sensor. Plug in the other end to your computer. Open the top of the plastic case and press the small reset button on the top.
				</label>
				<button className="btn btn-primary" onClick={this.handleConnect}>I did it!</button>
			</form>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.findAndConnect = this.findAndConnect.bind(this);
		this.connectPort = this.connectPort.bind(this);
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
	render() {
		var instructions
		if(this.state['step'] == 0.0) {
			// Starting Instructions
			instructions = <Starter findAndConnect={this.findAndConnect} />
		}
		if(this.state['step'] == 1.0) {
			// Device Found
			instructions = <h1> found </h1>
		}
		if(this.state['step'] == 1.1) {
			// Device not found
			instructions = <h1> not found </h1>
		}
		return(
			<div>
				<NavBar />
				<SideConsole buffer={this.state['buffer']}/>
				{instructions}
			</div>
		);
	}
};

ReactDOM.render(
	< App />,
	document.getElementById('app')
);
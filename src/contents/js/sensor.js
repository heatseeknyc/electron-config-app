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
		this.state = {width: "0%"};
		this.toggleExpand = this.toggleExpand.bind(this);
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
					Filler
				</div>
				<div className="consoleForm">
					<form className="form-inline">
						<input type="text" className="form-control " id="consoleInput" placeholder="For developers only!" />
						<button type="submit" className="btn btn-secondary">></button>
					</form>
				</div>
			</div>
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
			port: null
		};
	}
	connectPort(foundPortName) {
		const openPort = new SerialPort(foundPortName, {
			baudRate: 9600
		});
		openPort.on('data', chunk => {
			var str = String.fromCharCode(...chunk);
			console.log(str);
		});
		this.setState({
			deviceConnect: true,
			portName: foundPortName,
			port: openPort
		});
	}
	findAndConnect() {
		SerialPort.list().then(
			ports => {
				ports.forEach(port => {
					var pm = port['manufacturer'];
					if(typeof pm !== 'undefined' && pm.includes('Adafruit')){
						console.log("Found sensor serialport.");
						this.connectPort(port.comName.toString());
					}
				});
			},
			err => console.err(err)
		)
	}
	render() {
		if(!this.state.deviceConnect){
			this.findAndConnect();
		}
		return(
			<div>
				<NavBar />
				<SideConsole />
			</div>
		);
	}
};

ReactDOM.render(
	< App />,
	document.getElementById('app')
);
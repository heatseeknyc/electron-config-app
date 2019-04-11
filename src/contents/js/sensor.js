'use strict';
var React = require("react");
var ReactDOM = require("react-dom");

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
	render() {
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
'use strict';
var React = require("react");
var ReactDOM = require("react-dom");

function openConsole() {
	document.getElementById('sideConsoleID').style.width = "33%";
}

function closeConsole() {
	document.getElementById('sideConsoleID').style.width = "0%";
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('consoleIcon').addEventListener('click', openConsole);
	document.getElementById('consoleClose').addEventListener('click', closeConsole);
});

class NavBar extends React.Component {
	render() {
		return (
			<nav class="navbar navbar-light bg-light">
				<a class="navbar-brand" href="https://heatseek.org/">
					<img src="contents/img/heat_seek-logo-@2x-tp.png" height="45" class="d-inline-block align-top" />
				</a>
				<ul class="nav justify-content-end">
					<li class="nav-item">
			  			<a href="#"><i class="fas fa-terminal fa-lg" id="consoleIcon"></i></a>
					</li>
				</ul>
			</nav>
		);
	}
};

class SideConsole extends React.Component {
	render() {
		return (
			<div id="sideConsoleID" class="sideConsole">
				<div class="consoleHeader">
				</div>
				<a href="#"><i class="fas fa-times fa-2x" id="consoleClose"></i></a>
				<div class="consoleOutput">
					Filler
				</div>
				<div class="consoleForm">
					<form class="form-inline">
						<input type="text" class="form-control " id="consoleInput" placeholder="For developers only!" />
						<button type="submit" class="btn btn-secondary">></button>
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
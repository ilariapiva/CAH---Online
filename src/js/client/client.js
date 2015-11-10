var socket;
var connectBtn;

$(document).ready(function() {
	socket = io.connect("http://localhost:8080");
	/*if (localStorage.getItem("myVar") != null) {
		$(location).attr('href', "index.html");
	}*/

	//LOGIN
	socket.on("login_confirmed", function(data) {
		console.log("Login confirmed.", data.nclient);
		localStorage.setItem("myVar", data.nclient);
		$(location).attr('href', "index.html");
	});

	socket.on("login_error", function(data) {
		console.log("Login error.", data.err);
	});
	//END LOGIN

	//REGISTER
	socket.on("register_confirmed", function(data) {
		console.log("Register confirmed.", data.nclient);
		localStorage.setItem("myVar", data.nclient);
		$(location).attr('href', "login.html");
	});
	//END REGISTER

	//SETTINGS
	socket.on("settings_confirmed", function(data) {
		console.log("Settings confirmed.");
		localStorage.removeItem("myVar");
		$(location).attr('href', "login.html");
	});

	socket.on("settings_error", function(data) {
		console.log("Settings error.", data.err);
	});

	socket.on("getProfile_confirmed", function(data) {
		console.log("GetProfile confirmed.");
	});

	socket.on("getProfile_error", function(data) {
		console.log("GetProfile error.", data.err);
	});
	//END SETTINGS
});
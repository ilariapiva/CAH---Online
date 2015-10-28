var socket;
var connectBtn;

$(document).ready(function() {
	socket = io.connect("http://localhost:8080");
	/*if (localStorage.getItem("myVar") != null) {
		$(location).attr('href', "index.html");
	}*/
	socket.on("login_confirmed", function(data) {
		console.log("Login confirmed.", data.nclient);
		localStorage.setItem("myVar", data.nclient);
		$(location).attr('href', "index.html");
	});

	socket.on("login_error", function(data) {
		console.log("Login error.", data.err);
	});

	connectBtn = $("#btn-login");
	connectBtn.on("click", function() {
		console.log("Botton clicked.");
		socket.emit("login",{user: $("#email").val(), password: $("#password").val()});
	});
});
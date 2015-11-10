var express = require("express");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);


var db = require('./dbconnection.js');

io.set('origins', '*:8080');

io.sockets.on("connection", function(socket) {
	var cont = 0;
	console.log("Client connected.");
	
	//LOGIN
	socket.on("login", function(data) {
		console.log("Login");

		db.db_connect();
		db.db_login(data.email, data.password, function(res,idEncrypt){
			console.log("returned: ", res);
			if (res) {
				socket.emit("login_confirmed", {nclient: idEncrypt});
			}
			else{
					console.log("Error login");
					socket.emit("login_error", {err: "user error"});
				}
		});
	});
	//END LOGIN

	//REGISTER
	socket.on("register", function(data) {
		console.log("Register");

		db.db_connect();
		db.db_register(data.email, data.user, data.password, function(res, errors){
				if (res) {
					socket.emit("register_confirmed", {nclient: 15});
				}
				else{
						console.log("Error register");
						socket.emit("register_error", {err: errors});
					}
			});
	});
	//END REGISTER
	
	//SETTINGS
	socket.on("settings", function(data) {
		console.log("Settings");

		db.db_connect();
		db.db_settings(data.idN, data.user, data.password, function(res, errors){
				if (res) {
					socket.emit("settings_confirmed");
				}
				else{
						console.log("Error settings");
						socket.emit("settings_error", {err: errors});
					}
			});
	});

	socket.on("getProfile", function(data) {
		console.log("GetProfile");

		db.db_connect();
		db.db_getProfile(data.idN, function(res, profileData){
				if (res) {
					socket.emit("getProfile_confirmed");
				}
				else{
						console.log("Error getProfile");
						socket.emit("getProfile_error");
					}
			});
	});
	//END SETTINGS

	socket.on("disconnect", function(data) {
	});
});

app.use("/", express.static(__dirname + ' '));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "login.html");
});

server.listen(8080, "localhost");

console.log("CAH - Online is running on port 8080.");

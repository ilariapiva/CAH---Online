var express = require("express");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);


var db = require('./dbconnection.js');

io.set('origins', '*:8080');

io.sockets.on("connection", function(socket) {
	var cont = 0;
	console.log("Client connected.");
	
	socket.on("login", function(data) {
		console.log("Login");

		db.db_connect();
		db.db_login(data.email, data.password, function(res){
			console.log("returned: ", res);
			if (res) {
				socket.emit("login_confirmed", {nclient: 15});
			}
			else{
					console.log("Error login");
					socket.emit("login_error", {err: "user error"});
				}
		});
	});

	socket.on("register", function(data) {
		console.log("register");
		if (data.email != "ilaria") {
			
				socket.emit("register_confirmed", {nclient: 15});
		}
		else{
				console.log("Error login");
				socket.emit("register_error", {err: "user error"});
			}
	});
	
	socket.on("disconnect", function(data) {
	});
});

app.use("/", express.static(__dirname + ' '));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "login.html");
});

server.listen(8080, "localhost");

console.log("CAH - Online is running on port 8080.");

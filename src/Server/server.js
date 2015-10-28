var express = require("express");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

io.set('origins', '*:8080');

io.sockets.on("connection", function(socket) {
	var cont = 0;
	console.log("Client connected.");
	
	socket.on("login", function(data) {
		console.log("Login");
		if (data.user == "ilaria") {
			if (data.password == "boci") {
				socket.emit("login_confirmed", {nclient: 15});
			}
			else{
				socket.emit("login_error", {err: "password error"});
			}
		}
		else{
				socket.emit("login_error", {err: "user error"});
			}

	});
	
	socket.on("disconnect", function(data) {
	});
});

app.use("/", express.static(__dirname + '/public'));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

server.listen(8080, "localhost");

console.log("CAH - Online is running on port 8080.");

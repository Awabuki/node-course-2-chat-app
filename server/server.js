const path = require('path');  // Built in node module to work with paths, instead of using "../" to back up, module called PATH that comes with node
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT||3000; 
var app = express();
var server = http.createServer(app);  // server and app are almost identical, same calls and all.
var io = socketIO(server);

app.use(express.static(publicPath));

// register event listener. Get individual socket
io.on('connection', (socket) => {
	console.log('New user connected');
	
	socket.on('disconnect', () => {
		console.log('Client disconnected');
		
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});



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
	
	// emit events on the socket. if custom, exactly the same as client
	// second parameter is data to send. in this case, an object
	
	
	socket.emit('newMessage', {
		  from: 'mike@example.com',
		  text: 'Whats going on?!',
		  createdAt: Date.now()
		});

	socket.on('createMessage', (newMessage) => {
		console.log('createMessage:', newMessage);
	});
	
	
	socket.on('disconnect', () => {
		console.log('Client disconnected');
		
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});



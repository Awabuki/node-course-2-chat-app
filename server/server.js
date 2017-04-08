const path = require('path');  // Built in node module to work with paths, instead of using "../" to back up, module called PATH that comes with node
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT||3000; 
var app = express();
var server = http.createServer(app);  // server and app are almost identical, same calls and all.
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

// register event listener. Get individual socket
io.on('connection', (socket) => {
	console.log('New user connected');
	
	// emit events on the socket. if custom, exactly the same as client
	// second parameter is data to send. in this case, an object
	
	
	/*socket.emit('newMessage', {
		  from: 'mike@example.com',
		  text: 'Whats going on?!',
		  createdAt: Date.now()
		});*/


	
		// Challenge:
		//socket.emit - emit to user who jointed from Admin, text Welcome to the chat app
		// socket.broadcast.emit - from Admin, text: new user joined
		
		// move these into room join success
//		socket.emit('newMessage', generateMessage( 'Admin', 'Welcome to the chat app' ) );
//		socket.broadcast.emit('newMessage', generateMessage( 'Admin', 'New user joined' ) );
		

    socket.on('join', (params, callback) => {
			if ( !isRealString(params.name) || !isRealString(params.room) ) {
				return callback('Name and room name are required');
				// use return to stop exeuction
			}
			// use socketio feature to join 'room'
			socket.join(params.room);  // socket.leave to leave
			
			// new lesson code
			users.removeUser(socket.id);		// remove from other rooms
			users.addUser(socket.id, params.name, params.room); // add user to this room
			io.to(params.room).emit('updateUserList', users.getUserList(params.room));
			
			
			
			// new way to communicate. add "to" onto eixsting calls.
			// eg all is io.emit. new is io.to('room name').emit 
			// smae with broadcast 
			// socket.broadcast.emit -> socket.broadcase.to('room name').emit
			
			socket.emit('newMessage', generateMessage( 'Admin', 'Welcome to the chat app' ) );
			socket.broadcast.to(params.room).emit('newMessage', generateMessage( 'Admin', `${params.name} has joined` ) );
			
			
			callback();
		});



	socket.on('createMessage', (message, callback) => {  // callback sends event back to the front end
		//console.log('createMessage:', message);
		var user = users.getUser(socket.id);	
		
		if ( user && isRealString(message.text) ) {
			io.to(user.room).emit('newMessage', generateMessage( user.name, message.text ) );	
			
		}
		// Send message to all conections in io
		
		callback();
		
	// send to everyone in io EXCEPT this socket (the one called using)
	//~ socket.broadcast.emit('newMessage', {
			//~ from: message.from,
			//~ text: message.text,
			//~ createdAt: new Date().getTime()
		//~ });
	});	
		
socket.on('createLocationMessage', (coords) => {
	var user = users.getUser(socket.id);	
	if ( user ) {
		//io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
		io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		
	}
	
	
});		
	
	
	socket.on('disconnect', () => {
		var user = users.removeUser( socket.id );
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room) );
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} hsa left.`));
		}
		
		
		console.log('Client disconnected');
		
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});



var socket = io();  // init request from client to server, save conn in variable. extremely persistent. auto-reconnects

socket.on('connect', function() {
	console.log('connected to server');
	
	// event name, then data.
	/*socket.emit('createMessage', {
		from: 'guy@email.com',
		text: 'random garbage text here'
	});*/
	
});


socket.on('newMessage', function(message) {
	console.log('newMessage', message);
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

//newMessage emitte cby server, sent to everyone connected in room
//  from, text, createdAt
// print to console. Emit on connect. 

//createMessage, emitted from client to server.
// takes from, text.
// emits the message back on newMessage
//createdAt property added to message on the serv er.
// print to console.
// emit when connection starts.

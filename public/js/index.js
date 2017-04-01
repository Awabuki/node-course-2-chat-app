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
	var  li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var  li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');
	
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	
	jQuery('#messages').append(li);
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

//~ socket.emit('createMessage', {
	//~ from: 'Frank',
	//~ text: 'Hi'
//~ }, function(data) {  //callback function on awk
	//~ console.log('got it', data);
	//~ });

// call jquery with event e
jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();		// default is to submit form and put data in url
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {
		 
	});
	
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your broswer.');
	}	
	navigator.geolocation.getCurrentPosition(function(position) {
		//console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		}, function() {
	  alert('Unable to fetch location');		
	});
});

var socket = io();  // init request from client to server, save conn in variable. extremely persistent. auto-reconnects

function scrollToBottom () 
{
	// selectors
	var messages = jQuery('#messages');  // just one
	var newMessage = messages.children('li:last-child');  // last list item just added before our call
	
	// heights
	var clientHeight = messages.prop('clientHeight');  // client height property
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	
	if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ) 
	{
		messages.scrollTop(scrollHeight);
		
	}
	
}

socket.on('connect', function() {
	console.log('connected to server');
	
	// event name, then data.
	/*socket.emit('createMessage', {
		from: 'guy@email.com',
		text: 'random garbage text here'
	});*/
	
});


socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		  text: message.text,
		  from: message.from,
		  createdAt: formattedTime
		});
	
	jQuery('#messages').append(html);
	scrollToBottom();
	
	//console.log('newMessage', message);
	//~ var formattedTime = moment(message.createdAt).format('h:mm a');
	//~ var  li = jQuery('<li></li>');
	//~ li.text(`${message.from} ${formattedTime}: ${message.text}`);
	
	//~ jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		  text: message.text,
		  from: message.from,
		  createdAt: formattedTime,
		  url: message.url
		});
	
	jQuery('#messages').append(html);	
	scrollToBottom();
	
	
	//~ var  li = jQuery('<li></li>');
	//~ var a = jQuery('<a target="_blank">My current location</a>');
	
	//~ li.text(`${message.from} ${formattedTime}: `);
	//~ a.attr('href', message.url);
	//~ li.append(a);
	
	//~ jQuery('#messages').append(li);
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
	
	var messageTextbox = jQuery('[name=message]');
	
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function() {
		 messageTextbox.val('');
	});
	
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your broswer.');
	}	
	
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send Location');
		//console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		}, function() {
	  locationButton.removeAttr('disabled').text('Send Location');
	  alert('Unable to fetch location');		
	});
});

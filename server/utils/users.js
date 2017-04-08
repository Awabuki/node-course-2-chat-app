// make an array of data we want
[{
  id: 'sadfjsadlf',
  name: 'Jeremy',
  room: 'The Office Fans'	
}]

// make fn addUser(id, name, room)

// removeUser ( id )

// getUser( id )

// getUserList( room )

// new class to represent a person
//~ class Person {
	//~ constructor (name, age) {
		//~ this.name = name;
		//~ this.age = age;
	//~ }
	//~ getUserDescription() {
		//~ return `${this.name} is ${this.age} year(s) old.`;
		
	//~ }
//~ }

//~ var me = new Person('jeremy', '49');
//~ console.log(me.getUserDescription());

class Users {
	constructor () {
		this.users = [];
	}
	
	addUser( id, name, room ) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	
	removeUser( id ) {
		var remUser = this.users.filter( (user) => user.id === id);
		// Andrew set this.users to the result of filtering for NOT this remUser object. Kinda expensive in terms of processing.
    var iPos = this.users.indexOf(remUser[0]);
    if ( iPos !== -1 )
			this.users.splice( iPos, 1 );
    return remUser[0];
		//return removed user
		
	}
	
	getUser( id ) {
		var user = this.users.filter( (user) => user.id === id);
		return user[0];
		// or return this.users.filter( (user) => user.id === id)[0];
	}
	
	getUserList( room ) {
		// just return names
		//~ var users = this.users.filter( () => {
			//~ return user.room === room;
		//~ });
		// or the shorthand...
		var users = this.users.filter( (user) => user.room === room);
		var namesArray = users.map( (user) => user.name );
		return namesArray;
	}
	
}

module.exports = {Users};

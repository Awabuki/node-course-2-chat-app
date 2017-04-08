const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  
  	
		// fn called before test cases
		var users;  // defined here to accessible to test cases
		
		beforeEach( () => {
			users = new Users();
			users.users = [{
				id: '1',
				name: 'Mike',
				room: 'Node Course'
			},{
				id: '2',
				name: 'Jen',
				room: 'React Course'
			},{
				id: '3',
				name: 'Julie',
				room: 'Node Course'
			}];
		});
		
  
  it('should add new user', () => {
	
		var users = new Users();
	  var user = {
			id: '123',
			name: 'Phil',
			room: 'The Office Fans'
		};	
		var resUser = users.addUser(user.id, user.name, user.room);
		
		expect(users.users).toEqual([user]);
		
	});	
	
	it('should remove a user', () => {
		var remUser = users.removeUser('2');
		
		expect(users.users.length).toEqual(2);
		expect(remUser.name).toEqual('Jen');
		
	});
	
	it('should not remove user', () => {
		// pass in invalid user id
		var remUser = users.removeUser('33');
		
		expect(remUser).toNotExist();
		expect(users.users.length).toEqual(3);
	});
	
	it('should find user', () => {
		var user = users.getUser( '1' );
		
		expect(user).toEqual(users.users[0]);
		expect(user.id).toEqual('1');
		
	});
	
	it('should NOT find user', () => {
		// using an invalid id
		var user = users.getUser( '100' );
		
		expect(user).toEqual(undefined);  // or .toNotExist();
		
	});
	
	
	
	it('should return names for Node Course', () => {
		var userList = users.getUserList('Node Course');
		
		expect(userList).toEqual(['Mike','Julie']);
		
	});


	it('should return names for React Course', () => {
		var userList = users.getUserList('React Course');
		
		expect(userList).toEqual(['Jen']);
		
	});
	
})

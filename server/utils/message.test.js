var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var from = 'Jeremy', text = 'fapfapfap';
		// store res in variable
		var res = generateMessage(from, text);
		// assert from matches value passed in
		expect( res.from ).toBe(from);
		// asset text matches
		expect( res.text ).toBe(text);
		// assert createdAt is a number
		expect( res.createdAt ).toBeA('number');  
		// instead of from and text as individual, you can use..
		expect(res).toInclude({from, text});
		
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'Jeremy', lat = 12, long= -21;
		var url = `https://www.google.com/maps?q=${lat},${long}`;
		// pass in from, lat, long
		var res = generateLocationMessage(from, lat, long);
		// check from, createdat, and url 
		expect( res.from ).toBe(from);
		
		expect( res.createdAt ).toBeA('number'); 
		expect( res.url ).toBe(url);
		expect(res).toInclude({from, url});
	});
});

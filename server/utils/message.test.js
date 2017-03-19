var expect = require('expect');

var {generateMessage} = require('./message');

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

const expect = require('expect');
const {isRealString} = require('./validation');  // import isrealstring

// testing istreadstring
describe('Testing isRealString', () => {
	
//shoudl reject non string values
  it('should reject non string values', () => {
		var res = isRealString(123);
		expect( res ).toBe( false );
	});

// should reject string with only spaces
  it('should reject strings with only spaces', () => {
		var res = isRealString('   ');
		expect( res ).toBe( false );
	});

// should allow string with non-space characters
  it('should allow strings with non-space characters', () => {
		var res = isRealString('fap fap');
		expect( res ).toBe( true );
	});


});

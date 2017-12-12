const { assert } = require('chai');

describe('Given an array of numbers', () => {
 describe('When the user calls "indexOf()" of a number that is not present in the array', () => {
   it('Then, it should return -1', function() {
     assert.equal(-1, [1,2,3].indexOf(4));
   });
 });
});

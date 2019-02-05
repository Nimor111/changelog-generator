const expect = require('chai').expect;
const {trimArray, capitalize} = require('util/util');

describe('Test util', () => {
  describe('Test trimArray', () => {
    it('should trim array with empty strings', () => {
      const arr = ['', 'element', ''];

      expect(trimArray(arr)).to.deep.equal(['element']);
    });

    it('should return same array with no empty strings', () => {
      const arr = ['element'];

      expect(trimArray(arr)).to.deep.equal(arr);
    });
  });

  describe('Test capitalize', () => {
    it('should capitalize string', () => {
      const str = 'test';

      expect(capitalize(str)).to.equal('Test');
    });

    it('should not change capitalized', () => {
      const str = 'Test';

      expect(capitalize(str)).to.equal('Test');
    });

    it('should not change empty string', () => {
      const str = '';

      expect(capitalize(str)).to.equal('');
    });
  });
});

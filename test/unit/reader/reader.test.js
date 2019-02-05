const expect = require('chai').expect;
const {
  getTag,
  split,
  getDescription,
  getDetailedDescription,
  getBreakingChanges,
} = require('reader/reader');
const {
  fullValidMsg,
  invalidMsg,
  partialValidMsg,
  messageWithPrLinks,
} = require('./seed');

describe('Reader valid tests', () => {
  describe('Full message', () => {
    it('should split the commit message', () => {
      expect(split(fullValidMsg).length).to.equal(4);
    });

    it('should retrieve the commit subject tag', () => {
      expect(getTag(fullValidMsg)).to.equal('feature');
    });

    it('should retrieve the commit subject description', () => {
      expect(getDescription(fullValidMsg)).to.equal(
        'Add something to the repository',
      );
    });

    it('should retrieve the detailed description', () => {
      expect(getDetailedDescription(fullValidMsg)).to.deep.equal([
        '* Add something good',
        '* Add something bad',
      ]);
    });

    it('should retrieve the breaking changes', () => {
      expect(getBreakingChanges(fullValidMsg)).to.equal(
        'Add some breaking changes',
      );
    });
  });

  describe('Partial message', () => {
    it('should retrieve the commit subject tag', () => {
      expect(getTag(partialValidMsg)).to.equal('fix');
    });

    it('should retrieve the commit subject description', () => {
      expect(getDescription(partialValidMsg)).to.equal(
        'Fix something in the repository',
      );
    });

    it('should not find any other information', () => {
      expect(getDetailedDescription(partialValidMsg)).to.equal('');
      expect(getBreakingChanges(partialValidMsg)).to.equal('');
    });
  });

  describe('Message with pull request links', () => {
    const repository = 'https://github.com/test_repo';

    it('should replace pr number with link in description', () => {
      const expected = `Fix something in the repository ([#1](${repository}/pull/1))`;

      expect(getDescription(messageWithPrLinks, repository)).to.equal(expected);
    });

    it('should replace pr number in breaking changes as well', () => {
      const expected = `Add some breaking changes ([#2](${repository}/pull/2))`;

      expect(getBreakingChanges(messageWithPrLinks, repository)).to.equal(
        expected,
      );
    });
  });
});

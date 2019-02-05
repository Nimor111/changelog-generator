const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const fs = require('fs');

const {
  expectedChangelogMessage,
  expectedBreakingChanges,
  versionString,
  expectedVersionString,
} = require('./seed');
const {trimArray} = require('util/util');

const {
  createChangelog,
  getChangelogMessage,
  combineTags,
  getMessagesByTag,
} = require('generator/generator');
const {changelogMessage, formatDate} = require('util/util');

chai.use(sinonChai);

describe('Generator tests', () => {
  describe('Test createChangelog', () => {
    it("should create changelog if it doesn't exist", done => {
      const accessFileStub = sinon
        .stub(fs.promises, 'access')
        .rejects({code: 'ENOENT'});
      const writeFileStub = sinon.stub(fs.promises, 'writeFile');

      createChangelog()
        .then(() => {
          expect(accessFileStub).to.have.been.calledWith();
          expect(writeFileStub).to.have.been.calledWith();
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should not create changelog if it exists', done => {
      const accessFileStub = sinon.stub(fs.promises, 'access').resolves();

      const writeFileStub = sinon.stub(fs.promises, 'writeFile');

      createChangelog()
        .then(() => {
          expect(accessFileStub).to.have.been.calledWith();
          expect(writeFileStub).not.to.have.been.calledWith();
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    afterEach(() => {
      fs.promises.access.restore();
      fs.promises.writeFile.restore();
    });
  });

  describe('Test getChangelogMessage', () => {
    it('should get correct changelog message', () => {
      const version = '1.0.0';
      const commits = ['feature: A new feature', 'fix: Fixing the new feature'];
      const date = formatDate();

      const expected = expectedChangelogMessage(version, date);

      expect(getChangelogMessage(version, changelogMessage, commits)).to.equal(
        expected,
      );
    });

    it('should write breaking changes correctly', () => {
      const version = '1.0.0';
      const commits = [
        "feature: A new feature\nBREAKING CHANGES: Something doesn't work the same anymore",
      ];
      const date = formatDate();

      const expected = expectedBreakingChanges(version, date);

      expect(getChangelogMessage(version, changelogMessage, commits)).to.equal(
        expected,
      );
    });
  });

  describe('Test combineTags', () => {
    it('should combine commits with the same tags', () => {
      expect(combineTags(versionString)).to.equal(expectedVersionString);
    });

    it('should construct messages by tag correctly', () => {
      const messages = trimArray(versionString.split('\n'));
      const expected = {
        '### Feature': [messages[1], messages[3]],
        '### Fix': [messages[5], messages[7]],
      };

      expect(getMessagesByTag(messages)).to.deep.equal(expected);
    });
  });
});

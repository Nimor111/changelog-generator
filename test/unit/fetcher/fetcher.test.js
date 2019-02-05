const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const child_process_promise = require('child-process-promise');

chai.use(sinonChai);

const {fetchCommitsUntilVersion} = require('fetcher/fetcher');

describe('Test fetcher', () => {
  describe('Test fetch commits until version', () => {
    it('should fetch commits until specified version', done => {
      const commits = ['feature: A new feature', 'v1.0.0'];
      const cmd = 'git log -n 1 --pretty=format:%s';

      const execStub = sinon
        .stub(child_process_promise, 'exec')
        .onFirstCall()
        .returns({stdout: commits[0]})
        .onSecondCall()
        .returns({stdout: commits[1]});

      fetchCommitsUntilVersion(cmd, 'v1.0.0')
        .then(data => {
          expect(execStub).to.have.been.calledWith();
          expect(data).to.deep.equal([commits[0]]);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    afterEach(() => {
      child_process_promise.exec.restore();
    });
  });
});

const child_process_promise = require('child-process-promise');

const getSingleCommit = async (cmd, skip) => {
  try {
    const result = await child_process_promise.exec(`${cmd} --skip=${skip}`);
    return result.stdout;
  } catch (err) {
    throw new Error(err.message);
  }
};

const fetchCommitsUntilVersion = async (cmd, version) => {
  let commits = [];
  let idx = 0;

  try {
    let commit_msg = await getSingleCommit(cmd, idx);
    while (commit_msg !== version && commit_msg !== '') {
      commits.push(commit_msg);
      idx++;
      commit_msg = await getSingleCommit(cmd, idx);
    }
  } catch (err) {
    throw new Error(err.message);
  }

  return commits;
};

module.exports = {
  fetchCommitsUntilVersion,
};

const {trimArray} = require('../util/util');

const split = commitMsg => {
  return trimArray(commitMsg.split(/\n+/));
};

const formatPullRequest = (commitMsg, repository) => {
  const re = /#[0-9]+/;
  const match = re.exec(commitMsg);
  if (match) {
    const prNumber = match[0].split('#')[1];
    commitMsg = commitMsg.replace(re, getPullRequestLink(prNumber, repository));
  }

  return commitMsg;
};

const getPullRequestLink = (pullRequestNumber, repository) => {
  return `[#${pullRequestNumber}](${repository}/pull/${pullRequestNumber})`;
};

const getTag = commitMsg => {
  const subject = split(commitMsg)[0];
  return subject.substr(0, subject.indexOf(':')) || 'change';
};

const getDescription = (commitMsg, repository) => {
  const subject = split(commitMsg)[0];
  let description = subject
    .substr(subject.indexOf(':') + 1, subject.length)
    .trim();

  description = formatPullRequest(description, repository);

  return description;
};

const getDetailedDescription = commitMsg => {
  const s = split(commitMsg);
  if (s.length >= 3) {
    return s.slice(1, s.length - 1);
  }

  return '';
};

const getBreakingChanges = (commitMsg, repository) => {
  const s = split(commitMsg);
  if (s.length >= 2) {
    let breakingChanges = s[s.length - 1];
    breakingChanges = breakingChanges
      .substr(breakingChanges.indexOf(':') + 1, breakingChanges.length)
      .trim();

    breakingChanges = formatPullRequest(breakingChanges, repository);

    return breakingChanges;
  }

  return '';
};

module.exports = {
  split,
  getTag,
  getDescription,
  getDetailedDescription,
  getBreakingChanges,
};

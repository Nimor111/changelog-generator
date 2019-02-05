const {
  changelogOffset,
  formatDate,
  changelogMessage,
  capitalize,
  trimArray,
} = require('../util/util');
const {
  getTag,
  getDescription,
  getBreakingChanges,
} = require('../reader/reader');
const {
  writeToChangelog,
  checkForChangelog,
  readFromChangelog,
} = require('../generator/fs-util/fs-util');

const getCommitInformation = (commit, repository) => {
  const tag = capitalize(getTag(commit));
  const description = getDescription(commit, repository);

  const breakingChanges = getBreakingChanges(commit, repository);

  const message =
    breakingChanges !== ''
      ? `### ${tag}
  - ${description}
BREAKING CHANGES: ${breakingChanges}\n`
      : `### ${tag}
  - ${description}\n`;

  return message;
};

const createChangelog = async () => {
  try {
    await checkForChangelog();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return writeToChangelog(changelogMessage);
    } else {
      throw new Error(err.message);
    }
  }
};

const getMessagesByTag = messages => {
  const groups = {};
  let lastTag;

  messages.forEach(item => {
    if (item.startsWith('###')) {
      lastTag = item;
      if (!groups[item]) {
        groups[item] = [];
      }
    } else if (lastTag) {
      groups[lastTag].push(item);
    }
  });

  return groups;
};

const combineTags = versionString => {
  const messages = getMessagesByTag(versionString.split('\n'));

  let combinedTags = '';
  Object.entries(messages).forEach(pair => {
    combinedTags += `${pair[0]}\n`;
    combinedTags += pair[1].join('\n');
    combinedTags += '\n';
  });

  return combinedTags;
};

const getChangelogMessage = (version, data, commits, repository) => {
  let commitTitle = `## ${version} - ${formatDate()}\n\n`;
  let versionString = '';
  commits.forEach(
    commit => (versionString += getCommitInformation(commit, repository)),
  );
  data = data.toString().split('\n');
  data.splice(
    changelogOffset,
    0,
    `${commitTitle}${combineTags(versionString)}`,
  );
  return data.join('\n');
};

const writeCommits = async (version, commits, repository) => {
  try {
    const data = await readFromChangelog();
    const message = getChangelogMessage(
      version,
      trimArray(data),
      commits,
      repository,
    );
    await writeToChangelog(message);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createChangelog,
  writeCommits,
  getChangelogMessage,
  combineTags,
  getMessagesByTag,
};

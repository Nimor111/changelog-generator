const fs = require('fs');

const {changelogFile} = require('../../util/util');

const writeToChangelog = message => {
  return fs.promises.writeFile(changelogFile, message);
};

const checkForChangelog = () => {
  return fs.promises.access(changelogFile);
};

const readFromChangelog = () => {
  return fs.promises.readFile(changelogFile);
};

module.exports = {writeToChangelog, checkForChangelog, readFromChangelog};

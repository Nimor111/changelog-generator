const trimArray = arr => arr.filter(elem => elem !== '');

const formatDate = () =>
  new Date()
    .toLocaleDateString()
    .split('/')
    .join('-');

const capitalize = str => str && str[0].toUpperCase() + str.slice(1);

const changelogMessage = `# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).
`;

const changelogFile = 'CHANGELOG.md';
const changelogOffset = 7;

const versionRegex = /^((v|Version|version).*)* *[0-9]+\.[0-9]+\.[0-9]+$/;

const validateCommandLineVersionArgs = args => {
  args.forEach(arg => {
    if (!versionRegex.exec(arg)) {
      throw new Error(`${arg} is not a valid version!`);
    }
  });
};

module.exports = {
  trimArray,
  changelogMessage,
  changelogFile,
  formatDate,
  changelogOffset,
  capitalize,
  versionRegex,
  validateCommandLineVersionArgs,
};

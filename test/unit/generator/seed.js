const expectedChangelogMessage = (version, date) => `# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## ${version} - ${date}

### Feature
  - A new feature
### Fix
  - Fixing the new feature

`;

const expectedBreakingChanges = (version, date) => `# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## ${version} - ${date}

### Feature
  - A new feature
BREAKING CHANGES: Something doesn't work the same anymore

`;

const versionString = `### Feature
  - A new feature
### Feature
  - A newer feature
### Fix
  - Fixing the new feature
### Fix
  - Fixing the newer feature
`;

const expectedVersionString = `### Feature
  - A new feature
  - A newer feature
### Fix
  - Fixing the new feature
  - Fixing the newer feature

`;

module.exports = {
  expectedChangelogMessage,
  expectedBreakingChanges,
  versionString,
  expectedVersionString,
};

const fullValidMsg = `
feature: Add something to the repository

* Add something good
* Add something bad

BREAKING CHANGES: Add some breaking changes
`;

const partialValidMsg = `
fix: Fix something in the repository
`;

const invalidMsg = `
Add something to the repository
`;

const messageWithPrLinks = `
fix: Fix something in the repository (#1)

BREAKING CHANGES: Add some breaking changes (#2)
`;

module.exports = {
  fullValidMsg,
  partialValidMsg,
  invalidMsg,
  messageWithPrLinks,
};

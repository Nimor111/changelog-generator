#!/usr/bin/env node

const yargs = require("yargs");

const { fetchCommitsUntilVersion } = require("./lib/fetcher/fetcher");
const { createChangelog, writeCommits } = require("./lib/generator/generator");
const { validateCommandLineVersionArgs } = require("./lib/util/util");

const cmd = "git log -n 1 --pretty=format:%s";

const args = yargs
  .usage("Usage: $0 [options]")
  .alias("u", "until")
  .nargs("u", 1)
  .describe("u", "Last version of project")
  .demandOption(["new"])
  .alias("r", "repository")
  .nargs("r", 1)
  .describe("r", "The url to the repository")
  .demandOption(["repository"])
  .alias("n", "new")
  .nargs("n", 1)
  .describe("n", "New version to be written")
  .example(
    '$0 -n 2.0.0 -u 1.0.0 -r "https://github.com/user/repo"',
    "write commits since v1.0.0 to a new v2.0.0"
  )
  .help("h")
  .alias("h", "help").argv;

const until = args.until ? args.until : "0.0.1";
const newVersion = args.new;

const demo = async () => {
  try {
    const commits = await fetchCommitsUntilVersion(cmd, until);
    await createChangelog();
    writeCommits(newVersion, commits, args.repository);
  } catch (err) {
    console.error(err);
  }
};

try {
  validateCommandLineVersionArgs([until, newVersion]);
  demo();
} catch (e) {
  console.log(e.toString());
}

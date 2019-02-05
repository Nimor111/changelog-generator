# Changelog generator
Generates a CHANGELOG.md from git commit log

This tool does the following:

* Fetches commits from git log since a specified last version
* Parses them according to a specified [format](#commit-format)
* Generates ( or writes to an existing ) CHANGELOG.md file with a specified new version

## Usage

```
Usage: generate-changelog [options]

Options:
  --version    Show version number                                     [boolean]
  -u, --until  Last version of project
  -n, --new    New version to be written                              [required]
  -h, --help   Show help                                               [boolean]
```

## Installation

**Note** This tool requires nodejs version >= 10.0

Clone this repository:

```
git clone git@github.com:Nimor111/changelog-generator.git
```

Create a `generate-changelog` shell command

```
npm link
```

Now you can create your changelog

```
# Write commits since v1.0.0 to a new v2.0.0
generate-changelog -u 1.0.0 -n 2.0.0
```

## Commit format

Two types of commits are expected.

The first type are version commits which have the following format:

* v1.0.0
* Version 1.0.0
* 1.0.0

The second type are follow a format based on the Angular JS commit conventions:

```
<tag>: <description>

<detailed description> ( optional, doesn't get written to changelog )

BREAKING CHANGES: <description>
```

Where tag can be any of the following:

* feature
* fix
* test
* refactor
* style
* docs

More TBA.

## References

#### fetchCommitsUntilVersion(command, until)

Fetches commits from git log until it encounters a commit `until` ( in the version commit format specified above )

`command` is a shell command to fetch commits from the git log.

Returns a list of commits.

#### createChangelog()

Creates a CHANGELOG.md file and writes the initial changelog message to it. If the changelog file already exists, doesn't do anything.

#### writeCommits(newVersion, commits)

Writes `commits` tags and descriptions to the beginning of the changelog prefixed by `newVersion` ( after the initial message ) and before the version specified by the user.

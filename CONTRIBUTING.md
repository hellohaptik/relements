# Contributing
Please read the following guidelines before creating an issue or a pull request.

## Code of Conduct
Please read the code of conduction here. Please adhere to it.
https://github.com/hellohaptik/relements/blob/develop/CODE_OF_CONDUCT.md

## Branches
We maintain two branches, **master** and **develop**.
All PRs are raised against the **develop** branch. Hotfixes can be raised against a master branch but should only be done when unavoidable.

## Npm Releases
When a branch is merged into develop, a release is automatically generated on npm with the @next tag.
When a branch is merged into master, a release is automatically generated along with release notes and git tags on

## Commits
We use commitizen and a few other tools to organize and enforce naming best practices.
Whenever you commit, before the commit completes, certain pre-commit hooks are triggered. They will run all related tests, linters and the prettier.

Once those pass, the commit is guided where the cli will help format the message. 

** Please do not use --no-verify to skip this process


## Bugs
We use Github issues to keep track of all the bugs entering the system. If you notice a bug, please do file it on the issues panel. However, before doing so, make sure you've gone through the existing issues to make sure it's not a duplicate.

## Your First Pull Request
This can help you get started.
https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github

For you to get started, we keep labeling small fixes or features as **good first issue**. Feel free to take these up.

## Sending a Pull Request

When you send a pull request, the core team will review your pull request and take it forward. If no changes are needed and it is approved, it will be merged.

Before fixing an issue or deciding to work on a feature, it's best to check the issues panel and make sure no one else is working on the same issue. If you start, then try adding it as a comment to the issue, or create an initial PR to track your progress.

### Ideal flow
- Fork the repository & branch from develop
- `yarn install`
- `yarn storybook`
- Fix/Build
- Add Tests
- `yarn test`
- Make sure coverage is high and all use cases are covered by the test cases
- Commit with pre-commit hooks (automatic)
- Push & create a PR
- Label the PR accordingly
- Add a meaningful description

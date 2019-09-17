const { TRAVIS_BRANCH: branch } = process.env;

module.exports = {
  plugins:
    branch === "master"
      ? [
          "@semantic-release/commit-analyzer",
          "@semantic-release/release-notes-generator",
          "@semantic-release/changelog",
          ["@semantic-release/npm", { npmPublish: true }],
          [
            "@semantic-release/git",
            {
              assets: ["package.json", "CHANGELOG.md"],
              message:
                "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
          ],
          "@semantic-release/github",
        ]
      : [
          "@semantic-release/commit-analyzer",
          ["@semantic-release/npm", { npmPublish: true }],
          [
            "@semantic-release/git",
            {
              assets: ["package.json"],
              message:
                "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
          ],
        ],
  branches: ["master", { name: "develop", prerelease: true }],
};

const { GIT_BRANCH: branch } = process.env;

module.exports = {
  plugins:
    branch === 'master'
      ? [
          '@semantic-release/commit-analyzer',
          '@semantic-release/release-notes-generator',
          '@semantic-release/changelog',
          ['@semantic-release/npm', { npmPublish: false }],
          [
            '@semantic-release/git',
            {
              assets: ['package.json', 'CHANGELOG.md'],
              message:
                'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
          ],
          '@semantic-release/github',
        ]
      : [
          '@semantic-release/commit-analyzer',
          ['@semantic-release/npm', { npmPublish: false }],
        ],
  release: { branch: branch === 'develop' ? 'develop' : 'master' },
};

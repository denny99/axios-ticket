module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x', 'main', {
      name: 'rc', prerelease: true,
    }, {
      name: 'beta', prerelease: true,
    }], plugins: [
    [
      '@semantic-release/commit-analyzer', {
      preset: 'angular', releaseRules: [
        {
          type: 'imp', release: 'minor',
        }],
    }], [
      '@semantic-release/release-notes-generator', {
        preset: 'conventionalcommits', presetConfig: {
          types: [
            {
              type: 'fix', section: 'Bug Fixes',
            }, {
              type: 'feat', section: 'Features',
            }, {
              type: 'imp', section: 'Improvements',
            }],
        }, writerOpts: {
          commitGroupsSort: (a, b) => {
            // top -> bottom: Features -> Improvements -> Bug Fixes
            const commitGroupOrder = ['Bug Fixes', 'Improvements', 'Features'];
            const gRankA = commitGroupOrder.indexOf(a.title);
            const gRankB = commitGroupOrder.indexOf(b.title);
            if (gRankA >= gRankB) {
              return -1;
            } else {
              return 1;
            }
          },
        },
      }], '@semantic-release/changelog', [
      '@semantic-release/npm', {
        npmPublish: false
      }], [
      '@semantic-release/exec', {
        publishCmd: 'echo "version=$(echo ${nextRelease.version})" >> $GITHUB_OUTPUT',
      }], [
      '@semantic-release/github', {
        successComment: false,
        failComment: false,
        failTitle: false,
      }], [
      '@semantic-release/git', {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      }]],
};

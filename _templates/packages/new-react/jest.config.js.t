---
to: packages/<%= name %>/jest.config.js
---

module.exports = {
  preset: '../../jest.preset.js',
  verbose: true,
  displayName: '@emotion-styled-system/<%= name %>',
  transform: { '^.+\\.[jt]sx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

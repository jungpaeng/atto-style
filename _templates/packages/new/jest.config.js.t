---
to: packages/<%= name %>/jest.config.js
---

module.exports = {
  preset: '../../jest.preset.js',
  verbose: true,
  displayName: 'analyze-breakpoint',
  transform: { '^.+\\.[jt]s$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'js'],
};

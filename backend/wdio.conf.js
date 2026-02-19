export const config = {
  runner: 'local',
  specs: ['./src/automation/**/*.spec.js'],
  maxInstances: 1,
  capabilities: [{ browserName: 'chrome' }],
  logLevel: 'warn',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  baseUrl: 'https://example.com',
  services: ['chromedriver'],
};

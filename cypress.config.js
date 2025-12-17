const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    baseUrl: 'https://practicetestautomation.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

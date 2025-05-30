const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',   // 👈 puerto de npm start
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
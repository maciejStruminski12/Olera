const { defineConfig } = require('cypress')

module.exports = defineConfig({
 
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl: 'https://stg-app.olera.care/',
    viewportWidth: 1440,
    viewportHeight: 660,
    env: {
      adminEmail: 'qatest+admin@xfive.co',
      userEmail: 'qatest@xfive.co',
      password: '12345678',
      adminLoginUrl: 'https://staging-api.olera.care',
      loginUrl: 'https://stg-app.olera.care/sign-in',
      GOOGLE_CLIENTID:
        '460554232962-287268e1kcontjanv86pfrccagmvtlcb.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: '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',
      GOOGLE_REFRESH_TOKEN:
        '1//04uxWJAGJVExjCgYIARAAGAQSNwF-L9IrOsi48SskICJy3GG7uiZnsyOedolVfzsr49b5CPd5LeRAEiYHCUO4mL-EyPJk'
    },
    setupNodeEvents(on, config) {
        return require('./cypress/plugins/index.js')(on, config)
    },
  }
})

/* eslint-disable global-require */
const serviceLocator = require('../serviceLocator');
const config = require('../config')();

serviceLocator.register('express', () => require('express'));

serviceLocator.register('bodyParser', () => require('body-parser'));

serviceLocator.register('cors', () => require('cors'));

serviceLocator.register('compression', () => require('compression'));

serviceLocator.register('lodash', () => require('lodash'));

serviceLocator.register('moment', () => require('moment'));

serviceLocator.register('axios', () => require('axios'));

serviceLocator.register('chai', () => require('chai'));

serviceLocator.register('chai-http', () => require('chai-http'));

serviceLocator.register('randomstring', () => require('randomstring'));

serviceLocator.register('localStorage', () => {
  const { LocalStorage } = require('node-localstorage');
  const localStorage = new LocalStorage('./scratch');
  return localStorage;
});

serviceLocator.register('qs', () => require('qs'));

// Swaggers
serviceLocator.register('swaggerUi', () => require('swagger-ui-express'));
serviceLocator.register('swaggerJSDoc', () => require('swagger-jsdoc'));

serviceLocator.register('logger', () => require('../../logger').create(config.application_logging));
/* eslint-enable global-require */

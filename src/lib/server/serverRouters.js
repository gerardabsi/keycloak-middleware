const serviceLocator = require('../config/serviceLocator');

module.exports = class ServerRouter {
  constructor(app) {
    this.app = app;
    return function initialize(application) {
      const mainRouter = serviceLocator.get('mainRouter');
      const swaggerRouter = serviceLocator.get('swaggerRouter');
      application.use('/api-docs', swaggerRouter);
      application.use('/auth/v1', mainRouter);
    };
  }
};

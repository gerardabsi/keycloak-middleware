/* eslint-disable global-require */
const serviceLocator = require('../serviceLocator');
const config = require('../config')();

serviceLocator.register('serverRouters', () => require('../../server/serverRouters'));

serviceLocator.register('server', () => {
  const express = serviceLocator.get('express');
  const { port } = config.app;
  const compression = serviceLocator.get('compression');
  const cors = serviceLocator.get('cors');
  const bodyParser = serviceLocator.get('bodyParser');
  const serverRouters = serviceLocator.get('serverRouters');
  const logger = serviceLocator.get('logger');

  const Server = require('../../server');
  return new Server(express, port, compression, bodyParser, cors, serverRouters, logger);
});
/* eslint-enable global-require */

/* eslint-disable global-require */
const serviceLocator = require('../serviceLocator');
const config = require('../config')();

serviceLocator.register('axiosInstance', () => {
  const axios = serviceLocator.get('axios');
  const AxiosInstance = require('../axios');
  return new AxiosInstance(axios, config);
});

serviceLocator.register('AdminService', () => {
  const axiosInstance = serviceLocator.get('axiosInstance');
  const moment = serviceLocator.get('moment');
  const qs = serviceLocator.get('qs');
  const localStorage = serviceLocator.get('localStorage');
  const AdminService = require('../../admin/adminService');

  return new AdminService(axiosInstance, moment, qs, localStorage, config.auth, config.storage);
});

serviceLocator.register('AdminController', () => {
  const AdminService = serviceLocator.get('AdminService');
  const AdminController = require('../../admin/adminController');
  return new AdminController(AdminService);
});

serviceLocator.register('AdminRouter', () => {
  const express = serviceLocator.get('express');
  const AdminController = serviceLocator.get('AdminController');

  const AdminRouter = require('../../admin/adminRouter');
  return new AdminRouter(express, AdminController);
});

serviceLocator.register('AuthenticationService', () => {
  const axiosInstance = serviceLocator.get('axiosInstance');
  const moment = serviceLocator.get('moment');
  const qs = serviceLocator.get('qs');
  const AdminService = require('../../authentication/authenticationService');

  return new AdminService(axiosInstance, moment, qs, config.auth, config.storage);
});

serviceLocator.register('AuthenticationController', () => {
  const AuthenticationService = serviceLocator.get('AuthenticationService');
  const AuthenticationController = require('../../authentication/authenticationController');

  return new AuthenticationController(AuthenticationService);
});

serviceLocator.register('AuthenticationRouter', () => {
  const express = serviceLocator.get('express');
  const AuthenticationController = serviceLocator.get('AuthenticationController');

  const AuthenticationRouter = require('../../authentication/authenticationRouter');
  return new AuthenticationRouter(express, AuthenticationController);
});

serviceLocator.register('UserService', () => {
  const AdminService = serviceLocator.get('AdminService');
  const axiosInstance = serviceLocator.get('axiosInstance');
  const moment = serviceLocator.get('moment');
  const qs = serviceLocator.get('qs');
  const UserService = require('../../user/userService');

  return new UserService(AdminService, axiosInstance, moment, qs, config.auth, config.storage);
});

serviceLocator.register('UserController', () => {
  const UserService = serviceLocator.get('UserService');

  const UserController = require('../../user/userController');
  return new UserController(UserService);
});

serviceLocator.register('UserRouter', () => {
  const express = serviceLocator.get('express');
  const UserController = serviceLocator.get('UserController');

  const UserRouter = require('../../user/userRouter');
  return new UserRouter(express, UserController);
});

// Swagger
serviceLocator.register('swaggerRouter', () => {
  const express = serviceLocator.get('express');
  const swaggerUi = serviceLocator.get('swaggerUi');
  const swaggerJSDoc = serviceLocator.get('swaggerJSDoc');
  const SwaggerSetup = require('../../swaggerApiDoc/swaggerSetup');
  return new SwaggerSetup(express, swaggerUi, swaggerJSDoc);
});

serviceLocator.register('mainRouter', () => {
  const express = serviceLocator.get('express');
  const MainRouter = require('../../server/mainRouter');
  return new MainRouter(express);
});

/* eslint-enable global-require */

const serviceLocator = require('../config/serviceLocator');

module.exports = class MainRouter {
  constructor(express) {
    this.express = express;
    return this.initializeRouter();
  }

  initializeRouter() {
    const router = this.express.Router();
    const AdminRouter = serviceLocator.get('AdminRouter');
    const AuthenticationRouter = serviceLocator.get('AuthenticationRouter');
    const UserRouter = serviceLocator.get('UserRouter');

    router.use('/authenticate', AuthenticationRouter);
    router.use('/user', UserRouter);
    router.use('/admin', AdminRouter);
    router.use('/', (req, res) => {
      res.status(404).send({ message: 'not found' });
    });
    return router;
  }
};

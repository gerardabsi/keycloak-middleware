module.exports = class AuthenticationRouter {
  constructor(express, AuthenticationController) {
    this.express = express;
    this.AuthenticationController = AuthenticationController;
    return this.initializeRouter();
  }

  initializeRouter() {
    const router = this.express.Router();
    router
      .route('/')
      .post((req, res) => this.AuthenticationController.authenticate(req, res))
      .put((req, res) => this.AuthenticationController.refreshUserToken(req, res));

    router
      .route('/validateToken')
      .get((req, res) => this.AuthenticationController.validateToken(req, res));

    return router;
  }
};

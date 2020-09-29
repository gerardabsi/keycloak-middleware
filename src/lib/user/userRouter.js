module.exports = class UserRouter {
  constructor(express, UserController) {
    this.express = express;
    this.UserController = UserController;
    return this.initializeRouter();
  }

  initializeRouter() {
    const router = this.express.Router();

    router
      .route('/')
      .get((req, res) => this.UserController.userInfo(req, res))
      .post((req, res) => this.UserController.createUser(req, res));
    // TODO Update User

    router
      .route('/tokenIntrospect')
      .post((req, res) => this.UserController.tokenIntrospect(req, res));

    router
      .route('/changePassword/:userId')
      .put((req, res) => this.UserController.changePassword(req, res));

    router
      .route('/verify/:userId')
      .put((req, res) => this.UserController.verifyUser(req, res));

    return router;
  }
};

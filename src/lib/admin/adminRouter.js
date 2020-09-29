module.exports = class AdminRouter {
  constructor(express, AdminController) {
    this.express = express;
    this.AdminController = AdminController;
    return this.initializeRouter();
  }

  initializeRouter() {
    const router = this.express.Router();

    router
      .route('/users')
      .get((req, res) => this.AdminController.getUsers(req, res));

    router
      .route('/groups')
      .get((req, res) => this.AdminController.getGroups(req, res));

    router
      .route('/groups/:groupId')
      .get((req, res) => this.AdminController.getGroupUsers(req, res));

    return router;
  }
};

module.exports = class UserController {
  constructor(UserService) {
    this.UserService = UserService;
  }

  async createUser(req, res) {
    try {
      await this.UserService.createUser(req.body);
      res.status(201).send();
    } catch (e) {
      const error = JSON.parse(e.message);
      res.status(error.status).send(error.data);
    }
  }

  async userInfo(req, res) {
    try {
      const data = await this.UserService.userInfo(req.headers.authorization);
      res.send(data);
    } catch (e) {
      res.status(401).send(e);
    }
  }

  async verifyUser(req, res) {
    try {
      const data = await this.UserService.verifyUser(req.params.userId);
      res.send(data);
    } catch (e) {
      res.status(401).send(e);
    }
  }

  async tokenIntrospect(req, res) {
    try {
      const data = await this.UserService.tokenIntrospect(req.headers.authorization);
      res.send(data);
    } catch (e) {
      res.status(401).send(e);
    }
  }

  async changePassword(req, res) {
    try {
      await this.UserService.changePassword(req.params.userId, req.body.password);
      res.send();
    } catch (e) {
      res.status(401).send(e);
    }
  }
};

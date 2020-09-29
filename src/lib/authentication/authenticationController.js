module.exports = class AuthenticationController {
  constructor(AuthenticationService) {
    this.AuthenticationService = AuthenticationService;
  }

  async authenticate(req, res) {
    try {
      const data = await this.AuthenticationService.authenticate(req.body);
      res.send(data);
    } catch (e) {
      res.status(401).send(e);
    }
  }

  async validateToken(req, res) {
    try {
      await this.AuthenticationService.tokenIntrospect(req.headers.authorization);
      res.send();
    } catch (e) {
      res.status(401).send(e);
    }
  }

  async refreshUserToken(req, res) {
    try {
      const data = await this.AuthenticationService.refreshUserToken(req.headers.authorization, req.body.refresh_token);
      res.send(data);
    } catch (e) {
      res.status(401).send(e);
    }
  }
};

module.exports = class AdminController {
  constructor(AdminService) {
    this.AdminService = AdminService;
  }

  async getUsers(req, res) {
    try {
      res.send(await this.AdminService.getUsers(req.query));
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async getGroups(req, res) {
    try {
      res.send(await this.AdminService.getGroups());
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async getGroupUsers(req, res) {
    try {
      res.send(await this.AdminService.getGroupUsers(req.params.groupId));
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
};

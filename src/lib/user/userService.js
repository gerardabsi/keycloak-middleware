module.exports = class UserService {
  constructor(adminService, axiosInstance, moment, qs, adminCredentials, storage) {
    this.adminService = adminService;
    this.axiosInstance = axiosInstance;
    this.moment = moment;
    this.qs = qs;
    this.adminCredentials = adminCredentials;
    this.storage = storage;
  }

  async createUser(user) {
    try {
      const data = await this.adminService.authenticate();
      await this.axiosInstance.post(`admin/realms/${this.adminCredentials.realm}/users`, {
        username: user.email,
        enabled: true,
        totp: false,
        emailVerified: false,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        credentials: [
          { type: 'password', temporary: false, value: user.password }
        ],
        groups: [user.type],
        disableableCredentialTypes: [],
        requiredActions: [],
        notBefore: 0,
        access: {
          manageGroupMembership: true,
          view: true,
          mapRoles: true,
          impersonate: true,
          manage: true
        }
      }, {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      });
    } catch (e) {
      throw Error(JSON.stringify({
        status: e.response.status,
        data: e.response.data
      }));
    }
  }

  async userInfo(token) {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.realm}/protocol/openid-connect/userinfo`,
        this.qs.stringify({
          client_id: this.adminCredentials.loginClientId,
          client_secret: this.adminCredentials.clientSecret
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `${token}`
          }
        }
      );
      return data;
    } catch (e) {
      throw Error(e);
    }
  }

  async tokenIntrospect(token) {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.realm}/protocol/openid-connect/token/introspect`,
        this.qs.stringify({
          token,
          client_id: this.adminCredentials.loginClientId,
          client_secret: this.adminCredentials.clientSecret
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return data;
    } catch (e) {
      throw Error(e);
    }
  }

  async verifyUser(userId) {
    try {
      const data = await this.adminService.authenticate();
      await this.axiosInstance.put(`admin/realms/${this.adminCredentials.realm}/users/${userId}`, {
        emailVerified: true
      }, {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      });
      return data;
    } catch (e) {
      throw Error(e);
    }
  }

  async changePassword(userId, password) {
    try {
      const data = await this.adminService.authenticate();
      await this.axiosInstance.put(`admin/realms/${this.adminCredentials.realm}/users/${userId}/reset-password`, {
        type: 'password',
        temporary: false,
        value: password
      }, {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      });
    } catch (e) {
      throw Error(e.message);
    }
  }
};

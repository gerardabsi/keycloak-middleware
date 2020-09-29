module.exports = class AuthenticationService {
  constructor(axiosInstance, moment, qs, adminCredentials, storage) {
    this.axiosInstance = axiosInstance;
    this.moment = moment;
    this.qs = qs;
    this.adminCredentials = adminCredentials;
    this.storage = storage;
  }

  async authenticate(user) {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.realm}/protocol/openid-connect/token`,
        this.qs.stringify({
          username: user.username,
          password: user.password,
          grant_type: 'password',
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
      throw Error(e.message);
    }
  }

  async tokenIntrospect(token) {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.realm}/protocol/openid-connect/token/introspect`,
        this.qs.stringify({
          token: token.split(' ')[1],
          client_id: this.adminCredentials.loginClientId,
          client_secret: this.adminCredentials.clientSecret
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      if (data.active) return;
      throw Error('401');
    } catch (e) {
      throw Error(e);
    }
  }

  async refreshUserToken(token, refreshToken) {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.realm}/protocol/openid-connect/token`,
        this.qs.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: this.adminCredentials.loginClientId,
          client_secret: this.adminCredentials.clientSecret
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return data;
    } catch (e) {
      throw Error(e);
    }
  }
};

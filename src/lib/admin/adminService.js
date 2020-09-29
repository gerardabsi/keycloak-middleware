module.exports = class AdminService {
  constructor(axiosInstance, moment, qs, localStorage, adminCredentials, storageKeys) {
    this.axiosInstance = axiosInstance;
    this.moment = moment;
    this.qs = qs;
    this.localStorage = localStorage;
    this.adminCredentials = adminCredentials;
    this.storageKeys = storageKeys;
  }

  async authenticate() {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.masterRealm}/protocol/openid-connect/token`,
        this.qs.stringify({
          username: this.adminCredentials.username,
          password: this.adminCredentials.password,
          grant_type: 'password',
          client_id: this.adminCredentials.clientId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      await this.storeData(data);
      return data;
    } catch (e) {
      throw Error('401');
    }
  }

  async refreshToken() {
    try {
      const { data } = await this.axiosInstance.post(
        `realms/${this.adminCredentials.masterRealm}/protocol/openid-connect/token`,
        this.qs.stringify({
          grant_type: 'refresh_token',
          client_id: this.adminCredentials.clientId,
          refresh_token: this.localStorage.getItem(this.storage.adminRefreshToken)
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: this.localStorage.getItem(this.storage.adminToken)
          }
        }
      );
      await this.storeData(data);
    } catch (e) {
      throw Error('401');
    }
  }

  async getUsers(query) {
    try {
      const adminAuth = await this.authenticate();
      const { data } = await this.axiosInstance.get(`admin/realms/${this.adminCredentials.realm}/users`, {
        params: {
          ...query
        },
        headers: {
          Authorization: `Bearer ${adminAuth.access_token}`
        }
      });
      return data;
    } catch (e) {
      throw Error(e);
    }
  }

  async getGroups() {
    try {
      const adminAuth = await this.authenticate();
      const { data } = await this.axiosInstance.get(`admin/realms/${this.adminCredentials.realm}/groups`, {
        headers: {
          Authorization: `Bearer ${adminAuth.access_token}`
        }
      });
      return data;
    } catch (e) {
      throw Error(e);
    }
  }

  async getGroupUsers(groupId) {
    try {
      const adminAuth = await this.authenticate();
      const { data } = await this.axiosInstance.get(
        `admin/realms/${this.adminCredentials.realm}/groups/${groupId}/members`,
        {
          headers: {
            Authorization: `Bearer ${adminAuth.access_token}`
          }
        }
      );
      return data;
    } catch (e) {
      throw Error(e);
    }
  }

  async storeData(data) {
    await this.localStorage.setItem(this.storageKeys.tokenType, data.token_type);
    await this.localStorage.setItem(this.storageKeys.adminToken, data.access_token);
    await this.localStorage.setItem(this.storageKeys.adminTokenExpiry, this.moment(new Date()).add(data.expires_in, 's'));
    await this.localStorage.setItem(this.storageKeys.adminRefreshToken, data.refresh_token);
    await this.localStorage.setItem(this.storageKeys.adminRefreshExpiry, this.moment(new Date()).add(data.refresh_expires_in, 's'));
  }
};

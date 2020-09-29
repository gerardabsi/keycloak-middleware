module.exports = class AxiosInstance {
  constructor(axios, config) {
    this.axios = axios;
    this.config = config;
    return this.axiosInstance();
  }

  axiosInstance() {
    return this.axios.create({
      baseURL: this.config.url,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
  }
};

const appPrefix = process.env.APP_PREFIX || '';

module.exports = () => ({
  app: {
    port: process.env[`${appPrefix}APP_PORT`]
  },
  auth: {
    username: process.env[`${appPrefix}USERNAME`],
    password: process.env[`${appPrefix}PASSWORD`],
    clientId: process.env[`${appPrefix}CLIENT_ID`],
    clientSecret: process.env[`${appPrefix}CLIENT_SECRET`],
    loginClientId: process.env[`${appPrefix}LOGIN_CLIENT_ID`],
    masterRealm: process.env[`${appPrefix}MASTERREALM`],
    realm: process.env[`${appPrefix}REALM`]
  },
  storage: {
    tokenType: process.env[`${appPrefix}TOKEN_TYPE`],
    adminToken: process.env[`${appPrefix}ADMIN_TOKEN`],
    adminTokenExpiry: process.env[`${appPrefix}ADMIN_TOKEN_EXPIRY`],
    adminRefreshToken: process.env[`${appPrefix}ADMIN_REFRESH_TOKEN`],
    adminRefreshExpiry: process.env[`${appPrefix}ADMIN_REFRESH_TOKEN_EXPIRY`]
  },
  application_logging: {
    file: process.env.LOG_PATH,
    level: process.env[`${appPrefix}LOG_LEVEL`],
    console: process.env.LOG_ENABLE_CONSOLE || true
  },
  url: process.env[`${appPrefix}URL`]
});

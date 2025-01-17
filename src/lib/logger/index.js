const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, prettyPrint
} = format;

const createTransports = (config) => {
  const customTransports = [];
  if (config.file) {
    customTransports.push(
      new transports.File({
        filename: config.file,
        level: config.level
      })
    );
  }
  if (config.console) {
    customTransports.push(
      new transports.Console({
        level: config.level
      })
    );
  }

  return customTransports;
};

module.exports = {
  create: (config) => createLogger({
    transports: createTransports(config),
    format: combine(
      label({ label: 'Keycloak Middleware IDP' }),
      label({ label: 'Keycloak Middleware IDP' }),
      timestamp(),
      prettyPrint()
    )
  })
};

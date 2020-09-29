require('dotenv/config');
require('./lib/config/validateEnv');
require('./lib/config/loader/packageLoader');
require('./lib/config/loader/moduleLoader');
require('./lib/config/loader/serverLoader');

const serviceLocator = require('./lib/config/serviceLocator');

serviceLocator.get('server');

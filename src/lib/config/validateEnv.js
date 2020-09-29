const joi = require('@hapi/joi');

const appPrefix = process.env.APP_PREFIX || '';

const envSchema = joi.object({
  APP_PREFIX: joi.string().required().allow(''),
  [`${appPrefix}APP_PORT`]: joi.number().integer().required().greater(999),
  [`${appPrefix}LOG_LEVEL`]: joi.string().required()
}).unknown(true);

const { error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Process env validation error: ${error.message}`);
}

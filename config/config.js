const crypto = require('crypto').randomBytes(256).toString('hex');
const _ = require('lodash');

const config = {
  dev: 'development',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: 120, // 120 min
  secret: crypto
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;

try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);

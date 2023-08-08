const {
  NODE_ENV,
  DATABASE,
  PORT,
  JWT_SECRET,
  JWT_TTL,
} = process.env;

const config = {
  DB_HOST: NODE_ENV === 'production' ? DATABASE : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  JWT_TTL: NODE_ENV === 'production' ? JWT_TTL : '7d',
};

module.exports = config;

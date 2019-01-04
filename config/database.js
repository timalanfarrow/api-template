module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: null
  },
  production: process.env.DATABASE_URL
};

// app.tsでやったのにrequireってなんでいるのかちゃんと調べる
require('dotenv').config();

module.exports = {
  "development": {
    'username': process.env.DB_USERNAME || 'postgres',
    'password': process.env.DB_PASS || 'password',
    'database': process.env.DB_DATABASE || "express_development",
    'host': process.env.DB_HOST || "127.0.0.1",
    'port': process.env.DB_PORT || 5432,
    "dialect": process.env.DB_DIALECT || "postgres",
    "benchmark": true
  },
  "test": {
    'username': process.env.DB_USERNAME || 'postgres',
    'password': process.env.DB_PASS || 'password',
    'database': process.env.DB_DATABASE || "express_test",
    'host': process.env.DB_HOST || "127.0.0.1",
    'port': process.env.DB_PORT || 5432,
    "dialect": process.env.DB_DIALECT || "postgres",
    "benchmark": true,
  },
  "production": {
    'username': process.env.DB_USERNAME || 'postgres',
    'password': process.env.DB_PASS || 'password',
    'database': process.env.DB_DATABASE || "express_production",
    'host': process.env.DB_HOST || "127.0.0.1",
    'port': process.env.DB_PORT || 5432,
    "dialect": process.env.DB_DIALECT || "postgres",
    "benchmark": true
  }
};

// use_env_variable: DATABASE_URLでもよい

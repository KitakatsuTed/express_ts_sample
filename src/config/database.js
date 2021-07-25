// app.tsでやったのにrequireってなんでいるのかちゃんと調べる
require('dotenv').config();

module.exports = {
  // 'username': process.env.DB_USERNAME || 'postgres',
  // 'password': process.env.DB_PASS || 'password',
  'database': process.env.DB_DATABASE || "express_production",
  // 'host': process.env.DB_HOST || "127.0.0.1",
  // 'port': process.env.DB_PORT || 5432,

  "dialect": process.env.DB_DIALECT || "postgres",
  // "benchmark": true,
  "logQueryParameters" : true,
  "ssl": true,
  "dialectOptions": { ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

// use_env_variable: DATABASE_URLでもよい

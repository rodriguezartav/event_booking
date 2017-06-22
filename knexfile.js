// Update with your config settings.
require('dotenv').config()


module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: "localhost",
      database: "",
      user:     "",
      password: ""
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      host: "",
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: "",
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: "",
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

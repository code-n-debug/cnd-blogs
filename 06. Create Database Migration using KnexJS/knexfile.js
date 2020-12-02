// Update with your config settings.

module.exports = {
  development: {    // the root config that we will use
    client: 'pg',   // we are using Postgres so i set it up as pg, set the client you have (mysql, mysql2, etc...)
    connection: {
      database: 'knex_db',    // db name
      user:     'postgres', // db user
      password: 'password'  // db password
    },
    pool: {         // knex easily sets our connection as a pool
      min: 2,       // leave as default
      max: 10       // leave as default
    },
    migrations: {   // the name of migration table
      tableName: 'knex_migrations'
    }
  }
};
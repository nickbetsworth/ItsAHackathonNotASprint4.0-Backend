import fastifyPlugin from 'fastify-plugin';
import sql from 'mssql';

async function databasePlugin(fastify, options) {
  const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }

  fastify.decorate('dbClient', await sql.connect(sqlConfig))
}

export default fastifyPlugin(databasePlugin);
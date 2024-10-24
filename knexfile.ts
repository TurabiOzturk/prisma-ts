import type { Knex } from "knex";
import 'dotenv/config';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: "ts",
      directory: "./src/database/migrations",
      tableName: "migrations_history",
    },
  },
};

export default config;

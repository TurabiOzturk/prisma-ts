import knex, { Knex } from "knex";
import knexfile from "../../knexfile";

// Determine the current environment (development, production, etc.)
const environment: string = process.env.NODE_ENV || "development";

// Get the configuration for the current environment
const config: Knex.Config = knexfile[environment];

// Initialize and export the Knex instance
const knexInstance: Knex = knex(config);
export default knexInstance;

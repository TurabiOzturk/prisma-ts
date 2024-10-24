import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("categories", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.time("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("categories");
}
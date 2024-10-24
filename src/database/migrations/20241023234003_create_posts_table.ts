import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.timestamp("cretaed_at").defaultTo(knex.fn.now());
    table.timestamp("published_at").nullable();
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}

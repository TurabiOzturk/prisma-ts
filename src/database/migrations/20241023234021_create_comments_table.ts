import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary();
    table
      .integer("post_id")
      .unsigned()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table.text("content").notNullable();
    table.string("commenter_name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("comments");
}

import knex from "../models/knex";

interface Comment {
  id: number;
  post_id: number;
  content: string;
  commenter_name: string;
  created_at: Date;
}

const CommentModel = {
  getAll: (): Promise<Comment[]> => {
    return knex<Comment>("comments").whereNull("deleted_at");
  },

  getById: (id: number): Promise<Comment | undefined> => {
    return knex<Comment>("comments").where({ id }).first();
  },

  create: (comment: Omit<Comment, "id">): Promise<Comment[]> => {
    return knex<Comment>("comments").insert(comment).returning("*");
  },

  update: (
    id: number,
    comment: Partial<Omit<Comment, "id">>
  ): Promise<Comment[]> => {
    return knex<Comment>("comments").where({ id }).update(comment).returning("*");
  },

  delete: (id: number): Promise<Comment[]> => {
    return knex<Comment>("comments").where({ id }).returning("*");
  },
};

export default CommentModel;

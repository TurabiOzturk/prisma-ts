import knex from "../models/knex";

interface Comment {
  id: number;
  post_id: number;
  content: string;
  commenter_name: string;
  created_at?: Date;
}

const CommentModel = {
  getAll: (): Promise<Comment[]> => {
    return knex<Comment>("comments").whereNull("deleted_at");
  },

  getById: (id: number): Promise<Comment | undefined> => {
    return knex<Comment>("comments").where({ id }).first();
  },

  create: (post: Omit<Comment, "id">): Promise<Comment[]> => {
    return knex<Comment>("comments").insert(post).returning("*");
  },

  update: (
    id: number,
    post: Partial<Omit<Comment, "id">>
  ): Promise<Comment[]> => {
    return knex<Comment>("comments").where({ id }).update(post).returning("*");
  },

  delete: (id: number): Promise<Comment[]> => {
    return knex<Comment>("comments").where({ id }).returning("*");
  },
};

export default CommentModel;

import knex from "../models/knex";

interface Post {
  id: number;
  category_id: number;
  title: string;
  content: string;
  created_at?: Date;
  published_at?: Date | null;
  deleted_at?: Date | null;
}

const PostModel = {
  getAll: (): Promise<Post[]> => {
    return knex<Post>("posts").whereNull("deleted_at");
  },

  getById: (id: number): Promise<Post | undefined> => {
    return knex<Post>("posts").where({ id }).first();
  },

  create: (post: Omit<Post, "id">): Promise<Post[]> => {
    return knex<Post>("posts").insert(post).returning("*");
  },

  update: (id: number, post: Partial<Omit<Post, "id">>): Promise<Post[]> => {
    return knex<Post>("posts").where({ id }).update(post).returning("*");
  },

  delete: (id: number): Promise<Post[]> => {
    return knex<Post>("posts")
      .where({ id })
      .update({ deleted_at: knex.fn.now() })
      .returning("*");
  },
};

export default PostModel;

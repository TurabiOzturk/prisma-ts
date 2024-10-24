import knex from '../models/knex';

interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

const CategoryModel = {
  getAll: (): Promise<Category[]> => {
    return knex<Category>('categories').whereNull('deleted_at');
  },

  getById: (id: number): Promise<Category | undefined> => {
    return knex<Category>('categories').where({ id }).first();
  },

  create: (category: Omit<Category, 'id'>): Promise<Category[]> => {
    return knex<Category>('categories').insert(category).returning('*');
  },

  update: (id: number, category: Partial<Omit<Category, 'id'>>): Promise<Category[]> => {
    return knex<Category>('categories').where({ id }).update(category).returning('*');
  },

  delete: (id: number): Promise<Category[]> => {
    return knex<Category>('categories')
      .where({ id })
      .update({ deleted_at: knex.fn.now() })
      .returning('*');
  },
};

export default CategoryModel;

import { Request, Response } from "express";
import Category from "src/models/category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.getAll(req.query);
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving categories",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await Category.getById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      res
        .status(400)
        .json({ message: "Category name must be a string and is required" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }
    const category = await Category.create(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error creating category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      res
        .status(400)
        .json({ message: "Category name must be a string and is required" });
      return;
    }
    const updateResult = await Category.update(id, name);
    if (!updateResult) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid category ID." });
      return;
    }
    const deletedCategory = await Category.getById(id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    await Category.delete(id);
    res
      .status(200)
      .json({ message: `Category "${deletedCategory.name}" deleted` });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

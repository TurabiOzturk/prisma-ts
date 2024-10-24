import express, { Request, Response } from "express";
import Category from "../models/category";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }

  try {
    const category = await Category.getById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Record not found." });
    }
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const updatedCategory = await Category.update(categoryId, req.body);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const deletedCategory = await Category.delete(categoryId);
    res.status(202).json(deletedCategory);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;

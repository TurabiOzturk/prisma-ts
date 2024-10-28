import { Request, Response } from "express";
import Tag from "../models/tag";

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.getAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tags",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const tagName = req.body.name;
    if (!tagName) {
      res.status(400).json({ message: "Please enter a tag name" });
      return;
    }
    const tag = await Tag.create(tagName);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({
      message: "Error creating tag",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTagByID = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid tag ID." });
      return;
    }
    const tag = await Tag.getById(id);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tag",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid tag ID." });
      return;
    }

    const tagName = req.body;
    const updatedTag = await Tag.update(id, tagName);
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tag",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid tag ID." });
      return;
    }
    const deletedTag = await Tag.getById(id);
    if (!deletedTag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    await Tag.delete(id);
    res.status(200).json({ message: `Tag "${deletedTag.name}" deleted` });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tag",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

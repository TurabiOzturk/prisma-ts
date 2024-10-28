import { Request, Response } from "express";
import PostTag from "../models/posttag";

export const addPostTag = async (req: Request, res: Response) => {
  try {
    const postId: number = Number(req.params.id);
    if (!postId) {
      res.status(400).json({ message: "Post not found" });
      return;
    }
    const tagId: number = Number(req.body.tag_id);
    if (!tagId) {
      res.status(400).json({ message: "Tag not found" });
      return;
    }
    const addedPostTag = await PostTag.add(postId, tagId);
    res.status(201).json(addedPostTag);
  } catch (error) {
    res.status(500).json({
      message: "Error creating tag",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const removePostTag = async (req: Request, res: Response) => {
  try {
    const postId: number = Number(req.params.id);
    if (!postId) {
      res.status(400).json({ message: "Post not found" });
      return;
    }
    const tagId: number = Number(req.body.tag_id);
    if (!tagId) {
      res.status(400).json({ message: "Tag not found" });
      return;
    }
    const removedPostTag = await PostTag.delete(postId, tagId);
    res.status(201).json(removedPostTag);
  } catch (error) {
    res.status(500).json({
      message: "Error creating tag",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

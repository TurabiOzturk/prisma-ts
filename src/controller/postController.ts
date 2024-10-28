import { Request, Response } from "express";
import Post from "../models/post";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.getAll(req.query);
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving posts",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { categoryId, title, content } = req.body;
    if (!categoryId || !title || !content) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const post = await Post.create(categoryId, title, content);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getPostByID = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid post ID." });
      return;
    }
    const post = await Post.getById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving post",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid post ID." });
      return;
    }
    const { categoryId, title, content, publishedAt } = req.body;
    const updatedPost = await Post.update(
      id,
      categoryId,
      title,
      content,
      publishedAt
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving post",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid post ID." });
      return;
    }
    const deletedPost = await Post.getById(id);
    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    await Post.delete(id);
    res.status(200).json({ message: `Post "${deletedPost.title}" deleted` });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving post",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

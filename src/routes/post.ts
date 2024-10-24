import express, { Request, Response } from "express";
import Post from "../models/post";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.get("/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  if (isNaN(postId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const post = await Post.getById(postId);
    if (!post) {
      res.status(404).json({ message: "Record not found." });
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.put("/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  if (isNaN(postId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const updatedPost = await Post.update(postId, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.delete("/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  if (isNaN(postId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const deletedPost = await Post.delete(postId);
    res.status(202).json(deletedPost);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;

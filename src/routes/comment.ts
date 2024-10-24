import express, { Request, Response } from "express";
import Comment from "../models/comment";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.getAll();
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.get("/:id", async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  if (isNaN(commentId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }

  try {
    const comment = await Comment.getById(commentId);
    if (!comment) {
      res.status(404);
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCommnet = await Comment.create(req.body);
    res.status(201).json(newCommnet);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});
router.put("/:id", async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  if (isNaN(commentId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const updatedComment = await Comment.update(commentId, req.body);
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.delete("/:id", async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  if (isNaN(commentId)) {
    res
      .status(400)
      .json({ error: "Provided ID is not a number. Please enter a valid ID." });
  }
  try {
    const deletedComment = await Comment.delete(commentId);
    res.status(202).json(deletedComment);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;

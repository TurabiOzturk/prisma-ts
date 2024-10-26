import { Request, Response } from "express";
import { Comment } from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { post_id, commenter_name, content } = req.body;
    if (!post_id || !commenter_name || !content) {
      res
        .status(400)
        .json({
          message: "All fields (post_id, commenter_name, content) are required",
        });
      return;
    }
    const comment = await Comment.create({ post_id, commenter_name, content });
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating comment",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.getAll(req.query);
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving comments",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.getById(parseInt(id, 10));
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.json(comment);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving comment",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      res
        .status(400)
        .json({ message: "Content is required to update the comment" });
      return;
    }
    const updatedComment = await Comment.update(parseInt(id, 10), { content });
    res.status(200).json(updatedComment);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating comment",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Comment.delete(parseInt(id, 10));
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting comment",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

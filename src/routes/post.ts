import { Router } from "express";
import {
  getAllPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController";

import { addPostTag, removePostTag } from "../controller/postTagController";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:id/tags", addPostTag);
router.delete("/:id/tags", removePostTag);

export default router;

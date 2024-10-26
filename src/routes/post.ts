import { Router } from "express";
import {
  getAllPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;

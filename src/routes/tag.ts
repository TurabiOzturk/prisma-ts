import { Router } from "express";
import {
  getAllTags,
  createTag,
  getTagByID,
  updateTag,
  deleteTag,
} from "../controller/tagController";

const router = Router();

router.get("/", getAllTags);
router.post("/", createTag);
router.get("/:id", getTagByID);
router.patch("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;

import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import {
  getAllUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
} from "../controller/userController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.post("/", (req: Request, res: Response) => {
  createUser(req, res);
});
router.patch("/:id", (req: Request, res: Response) => {
  updateUser(req, res);
});
router.delete("/:id", deleteUser);

export default router;

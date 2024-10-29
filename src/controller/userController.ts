import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tags",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, userName, password } = req.body;
    if (!name || !userName || !password) {
      return res
        .status(400)
        .json({ message: "Name, user name and password required" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      name,
      userName,
      hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUserByID = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid user ID." });
      return;
    }
    const user = await User.getById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, userName, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await argon2.hash(password);
    }
    const updatedUser = await User.update({
      id: Number(id),
      ...(name && { name }),
      ...(userName && { userName }),
      ...(hashedPassword && { password: hashedPassword }),
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Please enter a valid user ID." });
      return;
    }
    
    const deletedUser = await User.getById(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await User.delete(id);
    res.status(200).json({ message: `User "${deletedUser.id}" deleted` });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving post",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

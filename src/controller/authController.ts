import { Request, Response } from "express";
import { User } from "../models/user";
import { RefreshToken } from "../models/refreshToken";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Extracting user info from request body
    const { name, userName, password } = req.body;

    // Check if all required fields are provided
    if (!name || !userName || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findByUserName(userName);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash password before storing it
    const hashedPassword = await argon2.hash(password);

    // Create the user in the database
    const newUser = await User.create({ name, userName, hashedPassword });

    // Generate JWT Access Token
    const accessToken = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" } // Short-lived access token
    );

    // Create and store Refresh Token
    const refreshExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    const refreshTokenRecord = await RefreshToken.create(
      newUser.id,
      refreshExpiresAt
    );

    // Generate JWT Refresh Token
    const refreshToken = jwt.sign(
      { tokenId: refreshTokenRecord.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // Must match the expiry date of the refresh token
    );

    // Respond with the tokens
    res.status(201).json({
      userId: newUser.id,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    // Find the user by username
    const user = await User.findByUserName(userName);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Verify the password
    const isPasswordValid = await argon2.verify(user.hashedPassword, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Generate Access Token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    // Create and store Refresh Token
    const refreshExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    const refreshTokenRecord = await RefreshToken.create(
      user.id,
      refreshExpiresAt
    );

    // Generate JWT Refresh Token
    const refreshToken = jwt.sign(
      { tokenId: refreshTokenRecord.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      userId: user.id,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body; // Extract refresh token from the request
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    // Decode the refresh token to extract the tokenId
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
    const { tokenId } = decoded as { tokenId: number }; // Extract tokenId from the payload

    // Find the token in the database
    const token = await RefreshToken.findById(tokenId);
    if (!token) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    // Mark it as revoked
    await RefreshToken.revoke(tokenId);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    // Validate refresh token
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as { tokenId: number };
    const tokenRecord = await RefreshToken.findById(payload.tokenId);

    if (!tokenRecord || tokenRecord.revokedAt) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Update Refresh Token expiry
    const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    await RefreshToken.update(tokenRecord.id, newExpiresAt);

    // Generate new Access Token
    const newAccessToken = jwt.sign(
      { userId: tokenRecord.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    // Generate new Refresh Token
    const newRefreshToken = jwt.sign(
      { tokenId: tokenRecord.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error refreshing token",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { userId } = decoded as { userId: number };

    // Find the user by userId
    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      userName: user.userName,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

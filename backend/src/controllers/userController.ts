import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const getUserProfile = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  console.log("Received auth header:", authHeader);

  if (!authHeader) {
    console.log("No auth header found");
    res.status(401).json({ error: "No authorization header" });
    return;
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const userData = jwt.verify(token, process.env.JWT_SECRET as string) as {
      name?: string;
      email: string;
      userId: number;
    };

    res.status(200).json({
      username: userData.name || "Anonymous",
      email: userData.email,
      userId: userData.userId
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
import express from "express";
import jwt from "jsonwebtoken";

export function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Missing token" });
    }

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
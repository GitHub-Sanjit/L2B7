import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";
import { verifyToken } from "./jwt";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return sendResponse(res, { message: "Token Not found" }, 404);
  }

  const payload = verifyToken(token, "refresh");
  if (!payload) {
    return sendResponse(res, { message: "Invalid Refresh Token" }, 404);
  }
};

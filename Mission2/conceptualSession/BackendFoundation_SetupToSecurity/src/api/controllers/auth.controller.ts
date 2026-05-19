import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken } from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);
  if (!user) {
    sendResponse(res, { message: "Failed to Create User" }, 400);
    return;
  }

  sendResponse(res, { message: "User Created Successfully", data: user }, 201);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // user validate, signtoken
  const user = await authService.validateUser(email, password);
  if (!user) {
    sendResponse(res, { message: "Invalid Credential" }, 400);
    return;
  }

  const { accessToken, refreshToken } = signToken(user);
  const result = {
    user: user,
    accessToken,
    refreshToken,
  };

  return sendResponse(
    res,
    {
      message: "User logged in Successfully",
      data: result,
    },
    200,
  );
};

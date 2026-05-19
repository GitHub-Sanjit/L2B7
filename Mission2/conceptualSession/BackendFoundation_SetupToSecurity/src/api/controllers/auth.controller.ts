import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken, verifyToken } from "../../utils/jwt";

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

  res.cookie("refreshToken", refreshToken, {
    sameSite: "lax",
    httpOnly: true,
    secure: false,
  });

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

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return sendResponse(res, { message: "Refresh Token Not found" }, 404);
  }

  const payload = verifyToken(refreshToken, "refresh");
  if (!payload) {
    return sendResponse(res, { message: "Invalid Refresh Token" }, 404);
  }

  const user = await authService.getUserById(payload.id);
  if (!user) {
    return sendResponse(res, { message: "User Not Found" }, 404);
  }

  const { accessToken, refreshToken: newRefreshToken } = signToken(user);

  res.cookie("refreshToken", newRefreshToken, {
    secure: false,
    sameSite: "lax",
    httpOnly: true,
  });

  sendResponse(
    res,
    {
      message: "Token Refreshed",
      data: {
        accessToken,
        newRefreshToken,
      },
    },
    200,
  );
};

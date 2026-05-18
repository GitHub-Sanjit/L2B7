import type { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDB(req.body);

    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(201).json({
      message: "User Logged In Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: { Error: error },
      data: error,
    });
  }
};

export const authController = {
  loginUser,
};

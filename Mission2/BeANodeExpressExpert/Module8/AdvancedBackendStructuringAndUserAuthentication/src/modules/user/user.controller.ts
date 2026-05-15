import type { Request, Response } from "express";
import { pool } from "../../db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email, password, age } = req.body;

  try {
    const result = await userServices.createUserIntoDB({
      name,
      email,
      password,
      age,
    });

    res.status(201).json({
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: { Error: error },
      data: error,
    });
  }
};

export const userController = {
  createUser,
};

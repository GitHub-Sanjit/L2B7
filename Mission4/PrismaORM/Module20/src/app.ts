import cookieParser from "cookie-parser";
import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

import config from "./config";
import { prisma } from "./lib/prisma";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({});
  res.json({ user: user });
});

app.post("/api/users/register", async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUserExist) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

export default app;

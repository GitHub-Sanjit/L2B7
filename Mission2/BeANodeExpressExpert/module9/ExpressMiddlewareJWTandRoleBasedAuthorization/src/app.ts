import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
const app: Application = express();
import fs from "fs";

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Method -> URL -> Time", req.method, req.url, Date.now());
  const log = `\n Method -> ${req.method}  Time -> ${Date.now()} URL -> ${req.url}\n`;
  fs.appendFile("logger.txt", log, (err) => {
    console.log(err);
  });
  next();
});

app.get("/user", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hi there, How are you doing?", author: "Next Level" });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRouter);

export default app;

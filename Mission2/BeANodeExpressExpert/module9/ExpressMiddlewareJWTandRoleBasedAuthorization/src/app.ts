import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import CookieParser from "cookie-parser";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";

const app: Application = express();

app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.get("/user", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hi there, How are you doing?", author: "Next Level" });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRouter);

export default app;

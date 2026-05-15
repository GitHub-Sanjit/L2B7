import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {  pool } from "./db";
import { userRoute } from "./modules/user/user.route";
const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/user", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hi there, How are you doing?", author: "Next Level" });
});

app.use("/api/users", userRoute)







export default app;

import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger";
import glabalErrorHandler from "./middleware/globalErrorHandler";
import { authRouter } from "./api/routes/auth.route";

const app: Application = express();

app.use(logger);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  throw new Error("Server is dying");
  res.send("This is the root Route");
});

app.use("/auth", authRouter);
app.use(glabalErrorHandler);
export default app;

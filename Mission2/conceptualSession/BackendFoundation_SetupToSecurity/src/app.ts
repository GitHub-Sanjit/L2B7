import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { logger } from "./middleware/logger";
import glabalErrorHandler from "./middleware/globalErrorHandler";
import { authRouter } from "./api/routes/auth.route";

const app: Application = express();

app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  throw new Error("Server is dying");
  res.send("This is the root Route");
});

app.use("/auth", authRouter);
app.use(glabalErrorHandler);
export default app;

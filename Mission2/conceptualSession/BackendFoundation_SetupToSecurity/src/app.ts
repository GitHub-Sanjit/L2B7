import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { logger } from "./middleware/logger";
import glabalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  throw new Error("Server is dying");
  res.send("This is the root Route");
});

app.use(glabalErrorHandler);
export default app;

import dotenv from "dotenv";
import path from "path";
import { env } from "process";

dotenv.config({
  quiet: true,
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connectionString: env.CONNECTIONSTRING as string,
  port: env.PORT,
  secret: env.JWT_SECRET as string,
  refresh_secret: env.JWT_REFRESH_SECRET as string,
};

export default config;

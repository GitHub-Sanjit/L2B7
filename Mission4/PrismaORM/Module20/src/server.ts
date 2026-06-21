import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port || 5001;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully");
    app.listen(port, () => {
      console.log(`Server is Running on PORT http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error Starting the Server", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

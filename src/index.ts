import { MongoDB } from "@databases/MongoDB";
import { logger } from "@utils/logger";
import { App } from "./App";
import { UsersRoute } from "./routes/users.routes";

const main = async () => {
  try {
    const app = new App();
    await app.init({ routes: [new UsersRoute()], database: new MongoDB() });
    app.listen();
  } catch (error) {
    console.log(error);
    logger.error("App crashed with error", error);
  }
};

main();

import mongoose, { ConnectOptions } from "mongoose";
import { config } from "@config";
import { Database } from "@interfaces/Database.interface";
import { logger } from "@utils/logger";
import { UserModel } from "@models/User.model";

const { DB_HOST, DB_PORT, DB_DATABASE } = config;

export class MongoDB implements Database {
  private url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

  constructor() {
    mongoose.set("debug", false);
    mongoose.connection.on("connected", function (err) {
      logger.info("[MongoDB]: Connection established.");
    });
    mongoose.connection.on("error", function (err) {
      logger.error(
        "[MongoDB]: Connection Error. Make sure MongoDB is running.",
        err
      );
    });
    mongoose.connection.on("disconnected", () => {
      logger.info(`[MongoDB]: Disconnected`);
    });
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.url);
    } catch (err) {
      logger.error(`[MongoDB]: Connection failed with error: ${err}`);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

import mongoose from "mongoose";
import { config } from "@config";
import { Database } from "@interfaces/Database.interface";
import { logger } from "@utils/logger";

const { DB_PROTOCOL, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } =
  config;

export class MongoDB implements Database {
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

  get url() {
    if (DB_PROTOCOL === "mongodb+srv") {
      return `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;
    }
    return `${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
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

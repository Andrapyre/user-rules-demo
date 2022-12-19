import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3001,
  // DATABASE
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 27017,
  DB_DATABASE: process.env.DB_DATABASE || "workerbase",
  // MQTT
  MQTT_HOST: process.env.MQTT_HOST || "broker.mqttdashboard.com",
  MQTT_PORT: process.env.MQTT_PORT || 1883,
  MQTT_USERNAME: process.env.MQTT_USERNAME || "workerbase",
  MQTT_PASSWORD: process.env.MQTT_PASSWORD || "admin",
  // LOG
  LOG_DIR: process.env.LOG_DIR || "../logs",
  LOG_FORMAT: process.env.LOG_FORMAT || "combined",
};

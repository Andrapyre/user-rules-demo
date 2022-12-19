import mqtt, { MqttClient } from "mqtt";
import { config } from "@config";
import { logger } from "@utils/logger";
import { Mqtt } from "@interfaces/Mqtt.interface";

export class MqttService implements Mqtt {
  private client: MqttClient;

  constructor() {
    this.client = mqtt.connect(
      `mqtt://${config.MQTT_HOST}:${config.MQTT_PORT}`,
      {
        protocolVersion: 5,
        resubscribe: true,
        username: config.MQTT_USERNAME,
        password: config.MQTT_PASSWORD,
      }
    );

    this.client.on("connect", () => {
      logger.info("[MQTT] Connection established");
    });

    this.client.on("reconnect", () => {
      logger.warn("[MQTT] Reconnecting");
    });

    this.client.on("end", () => {
      logger.info(`[SIGTERM] - MQTT CONNECTION CLOSED`);
    });

    this.client.on("disconnect", (err) => {
      logger.error(`[MQTT] Disconnect: ${err}`);
    });

    this.client.on("error", (err) => {
      logger.error(`[MQTT] Error: ${err}`);
    });
  }

  sendMessage(topic: string, payload: Record<string, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(
        topic,
        JSON.stringify(payload),
        { qos: 2 },
        (error?: Error) => {
          if (error) {
            reject(error);
          }
          resolve();
        }
      );
    });
  }

  subscribe(topic: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.subscribe(topic, { qos: 2 }, (err?: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

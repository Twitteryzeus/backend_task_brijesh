import dotenv from 'dotenv';
dotenv.config();

export const envConfigs = {
  port: process.env.PORT,
  host: process.env.HOST,
  mqtt: {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 33713,
    password: process.env.REDIS_PASSWORD
  },
  mongo: {
    dbUrl: process.env.DATABASE_URL || ''
  }
};
import * as mqtt from 'mqtt';
import { envConfigs } from "./config";

const connectUrl:string = `mqtt://${envConfigs.mqtt.host}:${envConfigs.mqtt.port}`;
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const mqttClient = mqtt.connect(connectUrl,{
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: envConfigs.mqtt.username,
  password: envConfigs.mqtt.password,
  reconnectPeriod: 1000,
});

export default mqttClient;
import * as http from 'http';
import { envConfigs } from './config';
import mqttClient from './mqtt-client';
import functions from './services';

const topic: string = '/nodejs/mqtt';

const requestListener = function (req: http.IncomingMessage, res: http.ServerResponse) {
  res.writeHead(200);
  res.end("My first server!");
};

mqttClient.on('connect', () => {
  console.log('Connected');
  mqttClient.subscribe([topic], async () => {
    console.log(`Subscribe to topic '${topic}'`);
    await functions.testToFind()
  })
  mqttClient.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })

  const server = http.createServer(requestListener);
  server.listen(envConfigs.port, () => {
    console.log(`Server is running on http://${envConfigs.host}:${envConfigs.port}`);
  });
});

mqttClient.on('message', function (topic, message) {
  // message is Buffer
  console.log('Received Message:', topic, message.toString())
  mqttClient.end()
});
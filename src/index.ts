import * as http from 'http';
import { version as packageVersion } from '../package.json';
import { envConfigs } from './config';
import mqttClient from './mqtt-client';
import services from './services';

const topic: string = '/nodejs/mqtt';

const requestListener = async function (req: http.IncomingMessage, res: http.ServerResponse) {
  const requestPath = req.url;

  switch (requestPath) {
    case '/fetchAllTasks': {
      if (req.method === 'GET') {
        const todos = await services.todo.todos();
        res.writeHead(200);
        return res.end(JSON.stringify(todos));
      }
    }
      break;
    default:
      break;
  }

  res.writeHead(200);
  return res.end(JSON.stringify({ version: packageVersion }));
};

mqttClient.on('connect', () => {
  console.log('Connected');
  mqttClient.subscribe([topic], async () => {
    console.log(`Subscribe to topic '${topic}'`);
  })
  mqttClient.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })

  const server = http.createServer(requestListener);
  server.listen(envConfigs.port, () => {
    console.log(`Server is running on http://${envConfigs.host}:${envConfigs.port}/`);
  });
});

mqttClient.on('message', function (topic, message) {
  // message is Buffer
  console.log('Received Message:', topic, message.toString())
  mqttClient.end()
});
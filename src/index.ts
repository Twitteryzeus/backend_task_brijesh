import mqttClient from './mqtt-client';
import functions from './services';
const topic:string = '/nodejs/mqtt';

mqttClient.on('connect', () => {
  console.log('Connected')
  mqttClient.subscribe([topic],  async () => {
    console.log(`Subscribe to topic '${topic}'`);
    await functions.testToFind()
  })
  mqttClient.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
});
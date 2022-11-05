import mqttClient from "./mqtt-client";

const topic:string = '/nodejs/mqtt';

mqttClient.on('connect', () => {
  console.log('Connected')
  mqttClient.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  mqttClient.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
});
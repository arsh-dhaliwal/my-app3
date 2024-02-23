import * as mqtt from 'mqtt';
import { SensorData } from '../types/index';
import { updateTemperatureData } from './helpers';

// MQTT client configuration
const MQTT_BROKER_URL = 'mqtt://your-broker-url';
const MQTT_OPTIONS = {
  clientId: 'ThermWatch_MQTT_Client',
  username: 'your_username', // Replace with actual username if authentication is required
  password: 'your_password', // Replace with actual password if authentication is required
};

// MQTT Topics
const MQTT_TOPICS = {
  temperatureData: 'thermwatch/sensors/+/temperature',
};

// Initialize MQTT client
const client = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);

client.on('connect', () => {
  console.log('MQTT Client Connected');
  // Subscribe to temperature data topic
  client.subscribe(MQTT_TOPICS.temperatureData, (err) => {
    if (err) {
      console.error('Failed to subscribe to temperature data topic', err);
    }
  });
});

client.on('message', (topic, message) => {
  // Parse the message and topic to extract sensor data
  try {
    const sensorData: SensorData = JSON.parse(message.toString());
    const sensorIdMatch = topic.match(/thermwatch\/sensors\/(.+)\/temperature/);
    const sensorId = sensorIdMatch ? sensorIdMatch[1] : null;

    if (sensorId) {
      // Update temperature data in the application state
      updateTemperatureData(sensorId, sensorData);
    }
  } catch (error) {
    console.error('Error parsing MQTT message', error);
  }
});

client.on('error', (error) => {
  console.error('MQTT Client Error', error);
});

// Export the MQTT client to be used in other parts of the application
export default client;
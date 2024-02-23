```typescript
import ModbusRTU from 'modbus-serial';
import { Sensor } from '../types/index';

// Create a Modbus client
const modbusClient = new ModbusRTU();

// Function to connect to the Modbus server (PLC or PFC)
const connectModbus = async (comPort: string, baudRate: number, parity: string, stopBits: number, dataBits: number) => {
  try {
    await modbusClient.connectRTUBuffered(comPort, { baudRate, parity, stopBits, dataBits });
    modbusClient.setID(1);
    console.log('Connected to Modbus server.');
  } catch (error) {
    console.error('Failed to connect to Modbus server:', error);
  }
};

// Function to read temperature data from a sensor
const readTemperature = async (sensor: Sensor) => {
  try {
    // Assuming temperature is stored in a holding register
    const data = await modbusClient.readHoldingRegisters(sensor.modbusAddress, 1);
    const temperature = data.data[0]; // Replace with correct data parsing
    return temperature;
  } catch (error) {
    console.error(`Failed to read temperature for sensor ${sensor.sensorName}:`, error);
    return null;
  }
};

// Function to close Modbus connection
const disconnectModbus = () => {
  modbusClient.close(() => {
    console.log('Modbus connection closed.');
  });
};

export { connectModbus, readTemperature, disconnectModbus };
```
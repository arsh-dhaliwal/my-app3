import React, { useState } from 'react';
import { sensorSettings } from '../hooks/useSensorData';
import { configureDAQ } from '../utils/modbusIntegration';
import { configureMQTT } from '../utils/mqttIntegration';

const DAQConfiguration: React.FC = () => {
  const [settings, setSettings] = useState<sensorSettings>({
    modbusEnabled: false,
    mqttEnabled: false,
    modbusConfig: {
      host: '',
      port: 502,
      unitId: 1,
    },
    mqttConfig: {
      brokerUrl: '',
      topic: '',
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (settings.modbusEnabled) {
      configureDAQ(settings.modbusConfig);
    }
    if (settings.mqttEnabled) {
      configureMQTT(settings.mqttConfig);
    }
  };

  return (
    <div id="daq-configurations-modal" className="daq-configuration">
      <h2>DAQ Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="modbusEnabled"
              checked={settings.modbusEnabled}
              onChange={handleInputChange}
            />
            Enable Modbus
          </label>
        </div>
        {settings.modbusEnabled && (
          <div>
            <label>
              Host:
              <input
                type="text"
                name="modbusConfig.host"
                value={settings.modbusConfig.host}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Port:
              <input
                type="number"
                name="modbusConfig.port"
                value={settings.modbusConfig.port}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Unit ID:
              <input
                type="number"
                name="modbusConfig.unitId"
                value={settings.modbusConfig.unitId}
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}
        <div>
          <label>
            <input
              type="checkbox"
              name="mqttEnabled"
              checked={settings.mqttEnabled}
              onChange={handleInputChange}
            />
            Enable MQTT
          </label>
        </div>
        {settings.mqttEnabled && (
          <div>
            <label>
              Broker URL:
              <input
                type="text"
                name="mqttConfig.brokerUrl"
                value={settings.mqttConfig.brokerUrl}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Topic:
              <input
                type="text"
                name="mqttConfig.topic"
                value={settings.mqttConfig.topic}
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}
        <button type="submit">Save Configuration</button>
      </form>
    </div>
  );
};

export default DAQConfiguration;
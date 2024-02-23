import React, { useState } from 'react';
import { Sensor } from '../types/index';

interface SensorProfileFormProps {
  onSave: (sensor: Sensor) => void;
  sensorData?: Sensor;
}

const SensorProfileForm: React.FC<SensorProfileFormProps> = ({ onSave, sensorData }) => {
  const [sensor, setSensor] = useState<Sensor>(sensorData || {
    id: '',
    name: '',
    family: '',
    type: '',
    variant: '',
    assetId: '',
    position: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSensor({ ...sensor, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(sensor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Sensor Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={sensor.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="family">Sensor Family:</label>
      <input
        type="text"
        id="family"
        name="family"
        value={sensor.family}
        onChange={handleChange}
        required
      />

      <label htmlFor="type">Sensor Type:</label>
      <input
        type="text"
        id="type"
        name="type"
        value={sensor.type}
        onChange={handleChange}
        required
      />

      <label htmlFor="variant">Sensor Variant:</label>
      <input
        type="text"
        id="variant"
        name="variant"
        value={sensor.variant}
        onChange={handleChange}
        required
      />

      <label htmlFor="assetId">Asset:</label>
      <select
        id="assetId"
        name="assetId"
        value={sensor.assetId}
        onChange={handleChange}
        required
      >
        {/* Options should be populated with assets from the database */}
      </select>

      <label htmlFor="position">Sensor Position:</label>
      <input
        type="number"
        id="position"
        name="position"
        value={sensor.position}
        onChange={handleChange}
        required
      />

      <button type="submit">Save Sensor Profile</button>
    </form>
  );
};

export default SensorProfileForm;
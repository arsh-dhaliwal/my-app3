import React, { useState } from 'react';
import { Plant } from '../types/index.d';

interface PlantProfileFormProps {
  onSave: (plant: Plant) => void;
  onCancel: () => void;
  existingPlant?: Plant;
}

const PlantProfileForm: React.FC<PlantProfileFormProps> = ({ onSave, onCancel, existingPlant }) => {
  const [plantName, setPlantName] = useState(existingPlant?.name || '');
  const [address, setAddress] = useState(existingPlant?.address || '');
  const [city, setCity] = useState(existingPlant?.city || '');
  const [stateProvince, setStateProvince] = useState(existingPlant?.stateProvince || '');
  const [country, setCountry] = useState(existingPlant?.country || '');
  const [zipCode, setZipCode] = useState(existingPlant?.zipCode || '');
  const [phoneNumber, setPhoneNumber] = useState(existingPlant?.phoneNumber || '');
  const [email, setEmail] = useState(existingPlant?.email || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      name: plantName,
      address,
      city,
      stateProvince,
      country,
      zipCode,
      phoneNumber,
      email,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{existingPlant ? 'Edit Plant Profile' : 'Add New Plant'}</h2>
      <label>
        Plant Name:
        <input type="text" value={plantName} onChange={(e) => setPlantName(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </label>
      <label>
        State/Province:
        <input type="text" value={stateProvince} onChange={(e) => setStateProvince(e.target.value)} required />
      </label>
      <label>
        Country:
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </label>
      <label>
        Zip/Postal Code:
        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
      </label>
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default PlantProfileForm;
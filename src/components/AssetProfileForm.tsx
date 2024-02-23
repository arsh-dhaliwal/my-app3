import React, { useState, useEffect } from 'react';
import { Asset } from '../types/index';
import { useDatabase } from '../hooks/useDatabase';

interface AssetProfileFormProps {
  onSave: (asset: Asset) => void;
  onCancel: () => void;
  existingAsset?: Asset;
  plantOptions: { value: string; label: string }[];
}

const AssetProfileForm: React.FC<AssetProfileFormProps> = ({ onSave, onCancel, existingAsset, plantOptions }) => {
  const [assetName, setAssetName] = useState(existingAsset?.name || '');
  const [selectedPlant, setSelectedPlant] = useState(existingAsset?.plantId || '');
  const [capacity, setCapacity] = useState(existingAsset?.capacity || '');
  const [rating, setRating] = useState(existingAsset?.rating || '');
  const [temperatureThreshold, setTemperatureThreshold] = useState(existingAsset?.temperatureThreshold || '');

  const { addAsset, updateAsset } = useDatabase();

  useEffect(() => {
    if (existingAsset) {
      setAssetName(existingAsset.name);
      setSelectedPlant(existingAsset.plantId);
      setCapacity(existingAsset.capacity);
      setRating(existingAsset.rating);
      setTemperatureThreshold(existingAsset.temperatureThreshold);
    }
  }, [existingAsset]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const assetData: Asset = {
      id: existingAsset?.id || Date.now().toString(), // Use timestamp as a simple unique ID
      name: assetName,
      plantId: selectedPlant,
      capacity,
      rating,
      temperatureThreshold,
    };

    if (existingAsset) {
      updateAsset(assetData);
    } else {
      addAsset(assetData);
    }

    onSave(assetData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="assetName">Asset Name:</label>
      <input
        id="assetName"
        type="text"
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
        required
      />

      <label htmlFor="plant">Plant:</label>
      <select
        id="plant"
        value={selectedPlant}
        onChange={(e) => setSelectedPlant(e.target.value)}
        required
      >
        <option value="">Select a plant</option>
        {plantOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="capacity">Capacity:</label>
      <input
        id="capacity"
        type="text"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />

      <label htmlFor="rating">Rating:</label>
      <input
        id="rating"
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <label htmlFor="temperatureThreshold">Temperature Threshold:</label>
      <input
        id="temperatureThreshold"
        type="text"
        value={temperatureThreshold}
        onChange={(e) => setTemperatureThreshold(e.target.value)}
        required
      />

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AssetProfileForm;
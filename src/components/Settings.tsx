import React, { useState } from 'react';
import CompanyProfileForm from './CompanyProfileForm';
import PlantProfileForm from './PlantProfileForm';
import AssetProfileForm from './AssetProfileForm';
import SensorProfileForm from './SensorProfileForm';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('company');

  const renderForm = () => {
    switch (activeTab) {
      case 'company':
        return <CompanyProfileForm />;
      case 'plant':
        return <PlantProfileForm />;
      case 'asset':
        return <AssetProfileForm />;
      case 'sensor':
        return <SensorProfileForm />;
      default:
        return null;
    }
  };

  return (
    <div id="settings-modal" className="settings-modal">
      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          Company Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'plant' ? 'active' : ''}`}
          onClick={() => setActiveTab('plant')}
        >
          Plant Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'asset' ? 'active' : ''}`}
          onClick={() => setActiveTab('asset')}
        >
          Asset Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'sensor' ? 'active' : ''}`}
          onClick={() => setActiveTab('sensor')}
        >
          Sensor Profile
        </button>
      </div>
      <div className="settings-content">
        {renderForm()}
      </div>
    </div>
  );
};

export default Settings;
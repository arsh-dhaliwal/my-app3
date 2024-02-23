import React, { useState } from 'react';
import CompanyProfileForm from './CompanyProfileForm';
import PlantProfileForm from './PlantProfileForm';
import AssetProfileForm from './AssetProfileForm';
import SensorProfileForm from './SensorProfileForm';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AppConfiguration = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('company');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <button onClick={openModal}>App Configurations</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="App Configurations"
        className="app-configurations-modal"
      >
        <h2>App Configurations</h2>
        <ul className="tab-list">
          <li className={activeTab === 'company' ? 'active' : ''} onClick={() => switchTab('company')}>Company Profile</li>
          <li className={activeTab === 'plant' ? 'active' : ''} onClick={() => switchTab('plant')}>Plant Profile</li>
          <li className={activeTab === 'asset' ? 'active' : ''} onClick={() => switchTab('asset')}>Asset Profile</li>
          <li className={activeTab === 'sensor' ? 'active' : ''} onClick={() => switchTab('sensor')}>Sensor Profile</li>
        </ul>
        <div className="tab-content">
          {activeTab === 'company' && <CompanyProfileForm />}
          {activeTab === 'plant' && <PlantProfileForm />}
          {activeTab === 'asset' && <AssetProfileForm />}
          {activeTab === 'sensor' && <SensorProfileForm />}
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default AppConfiguration;
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
import logoPlaceholder from '../assets/logo-placeholder.svg';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="logo-container">
        <img src={logoPlaceholder} alt="ThermWatch Logo" />
        <span>ThermWatch</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" exact activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/app-configurations" activeClassName="active">
          App Configurations
        </NavLink>
        <NavLink to="/daq-configuration" activeClassName="active">
          DAQ Configuration
        </NavLink>
        <NavLink to="/alerts-alarms" activeClassName="active">
          Alerts and Alarms
        </NavLink>
      </div>
      <button id="demo-mode-button" className="demo-mode-button">
        Demo Mode
      </button>
    </nav>
  );
};

export default Navigation;
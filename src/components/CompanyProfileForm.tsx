import React, { useState } from 'react';
import { Company } from '../types';

interface CompanyProfileFormProps {
  onSave: (company: Company) => void;
  companyProfile?: Company;
}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({ onSave, companyProfile }) => {
  const [company, setCompany] = useState<Company>(companyProfile || {
    companyName: '',
    address: '',
    city: '',
    stateProvince: '',
    country: '',
    zipPostalCode: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(company);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={company.companyName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={company.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={company.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="stateProvince">State/Province:</label>
        <input
          type="text"
          id="stateProvince"
          name="stateProvince"
          value={company.stateProvince}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={company.country}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="zipPostalCode">Zip/Postal Code:</label>
        <input
          type="text"
          id="zipPostalCode"
          name="zipPostalCode"
          value={company.zipPostalCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={company.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={company.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default CompanyProfileForm;
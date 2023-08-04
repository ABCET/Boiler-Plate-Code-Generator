import React from 'react';

const DropDown = ({ label, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

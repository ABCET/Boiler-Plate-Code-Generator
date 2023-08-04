import React from 'react';

const TextArea = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label>Generated Code</label>
      <textarea value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
};

export default TextArea;

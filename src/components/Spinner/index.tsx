import React from 'react';

const Spinner: React.FC = () => (
  <div className="spinner">
    <div className="spinner__loader">Loading...</div>
    <style>
      {`
      .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .spinner__loader {
        font-size: 14px;
        color: #555;
      }
    `}
    </style>
  </div>
);

export default Spinner;

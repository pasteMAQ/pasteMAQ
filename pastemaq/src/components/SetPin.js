import React from 'react';

const SetPin = ({ passPin }) => {

  const handlePinChange = (event) => {
    const inputPin = event.target.value;
    // Ensure only numbers are entered and limit to 4 digits
    if (/^\d{0,4}$/.test(inputPin)) {
      passPin(inputPin);
    }
  };

  return (
    <div>
      <h5>
        Please set 4 digit pin if you want to share code with external user:
        <input
          type="password"
          onChange={handlePinChange}
          maxLength="4"
        />
      </h5>
    </div>
  );
};

export default SetPin;
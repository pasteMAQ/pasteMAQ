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
    <div class = "setPin">
        Set 4 digit pin:
        <input
          type="text"
          onChange={handlePinChange}
          style={{ width: "32px", marginTop: "4px", marginLeft: "4px" }}
          maxLength="4"
        />
    </div>
  );
};

export default SetPin;
// PinValidationPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ValidationPin = () => {
  const [pin, setPin] = useState('');
  const { pasteId } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


  const handlePinChange = (event) => {
    const inputPin = event.target.value;
    // Ensure only numbers are entered and limit to 4 digits
    if (/^\d{0,4}$/.test(inputPin)) {
      setPin(inputPin);
    }
  };

  const handleSubmit = async () => {
    const options = {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json; charset=utf-8" })
    };
    const response = await fetch('http://localhost:5005/validate-pin/' + pasteId + '/' + pin,
      options
    );
    const data = await response.json();
    console.log(data);
    if (data.matched) {
      navigate('/view-paste/' + pasteId);
    }
    else {
        setShowPopup(true);
    }
  };

  const closePopup = () => {
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div>
      <h5>This paste is secured by a pin. Please enter a pin to access the paste.</h5>
      <label>
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          maxLength="4"
        />
      </label>
      <div><button onClick={handleSubmit}>Submit</button></div>
      {showPopup && (
        <div className="popup">
          <p id="popup-text">Incorrect PIN. Please try again.</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ValidationPin;
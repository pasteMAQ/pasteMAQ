// PinValidationPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ViewPaste from './ViewPaste';

const ValidationPin = () => {
  const [pin, setPin] = useState('');
  const { pasteId } = useParams();
  const [showComponent, setShowComponent] = useState(<Loader />);

  const validatePaste = async () => {
    let reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    reqHeaders.append('Access-Control-Allow-Origin', '*');

    const options = {
      method: "GET",
      headers: reqHeaders
    };
    const response = await fetch('https://paste-maq-server.vercel.app/validate-paste/' + pasteId,
      options
    );
    const data = await response.json();
    if (!data.found) {
      setShowComponent(<ViewPaste pasteId={pasteId} />);
    }
    else {
      setShowComponent(React.Fragment)
    }
  }

  useEffect(() => {
    validatePaste()
  }, []);


  const handlePinChange = (event) => {
    const inputPin = event.target.value;
    // Ensure only numbers are entered and limit to 4 digits
    if (/^\d{0,4}$/.test(inputPin)) {
      setPin(inputPin);
    }
  };

  const handleSubmit = async () => {
    let reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    reqHeaders.append('Access-Control-Allow-Origin', '*');

    const options = {
      method: "GET",
      headers: reqHeaders
    };
    const response = await fetch('http://localhost:5005/validate-pin/' + pasteId + '/' + pin,
      options
    );
    const data = await response.json();
    if (data.matched) {
      setShowComponent(<ViewPaste pasteId={pasteId} />);
    }
    else {
      alert("Pin not matched");
    }
  };

  return showComponent == React.Fragment ? (
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
    </div>
  ) : showComponent;
};

export default ValidationPin;
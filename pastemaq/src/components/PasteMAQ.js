import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import SetPin from './SetPin';

const PasteMAQ = () => {
    const navigate = useNavigate();
    var datemap = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [text, setText] = useState('');
    const [pasteId, setPasteId] = useState();
    const [pastePin, setPastePin] = useState('');

    useEffect(() => {
        var date = new Date();
        date.setDate(date.getDate() + 60)
        setExpiryDate(date);
        setPasteId(nanoid(9));
    }, []);

    function handleChange(event) {
        setText(event.target.value);
    }

    const setPasteData = async () => {
        var data = {
            "content": text,
            "expiryDate": expiryDate,
            "pasteId": pasteId,
            "pastePin": pastePin
        };

        if (text == '') {
            alert("Please enter some text to paste");
            return;
        }
        let reqHeaders = new Headers();
        reqHeaders.append('Content-Type', 'application/json');
        reqHeaders.append('Access-Control-Allow-Origin', '*');

        const options = {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(data)
        };
        const response = await fetch('https://paste-maq-server.vercel.app/paste',
            options
        );
        const result = await response.json();
        if (result.msg === "Paste Added") {
            navigate('/view-paste/' + pasteId);
        }
    }

    const setPin = (pin) => {
        setPastePin(pin);
    }

    return (
        <div>
            <textarea name="code" rows="10" cols="80" style={{ height: '170px' }} value={text} onChange={handleChange}></textarea>
            <div>
                <h5>This paste will expire by default on <span id="time">{datemap[expiryDate?.getMonth() + 1] + " " + expiryDate?.getDate() + ", " + expiryDate?.getFullYear()}</span></h5>
                <h5>Select Expiry Date <input type="date" className="datepicker" value={expiryDate?.getFullYear() + "-" + (!parseInt((parseInt(expiryDate?.getMonth()) + 1)/10)? "0" + (expiryDate?.getMonth() + 1) : (expiryDate?.getMonth() + 1)) + "-" + (!parseInt(parseInt(expiryDate?.getDate())/10)? "0" + expiryDate?.getDate() : expiryDate?.getDate())} min={new Date().toISOString().split('T')[0]} onChange={(event) => setExpiryDate(new Date(event.target.value))} /></h5>
                <SetPin passPin={setPin} />
                <div>
                    <button type="submit" value="Paste!" onClick={() => setPasteData()}><span>Paste!</span></button>
                </div>
            </div>
        </div>
    );
}

export default PasteMAQ;

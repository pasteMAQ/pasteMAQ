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
        let reqHeaders = new Headers();
        reqHeaders.append('Content-Type', 'application/json');
        reqHeaders.append('Access-Control-Allow-Origin', '*');

        const options = {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:5005/paste',
            options
        );
        const result = await response.json();
        if (result.msg === "Paste Added") {
            if (pastePin !== '') {
                navigate('/validate-pin/' + pasteId);
            } else {
                navigate('/view-paste/' + pasteId);
            }
        }
        console.log(result);

        // fetch('https://paste-maq-server.vercel.app/paste',{
        //     method: "POST",
        //     headers: reqHeaders,
        //     body: JSON.stringify(data)
        // }  
        // ).then(response => {
        //     console.log(response);
        //     navigate('/view-paste/' + pasteId);
        // }).catch(error => {
        //     console.log(error);
        // }
        // );
    }

    const setPin = (pin) => {
        setPastePin(pin);
    }

    return (
        <div>
            <textarea name="code" rows="10" cols="80" style={{ height: '170px' }} value={text} onChange={handleChange}></textarea>
            <div>
                <h5>This paste will expire by default on <span id="time">{datemap[expiryDate?.getMonth() + 1] + " " + expiryDate?.getDate() + ", " + expiryDate?.getFullYear()}</span></h5>
                <h5>Select Expiry Date <input type="date" value={expiryDate} onChange={(event) => setExpiryDate(new Date(event.target.value))} /></h5>
                <SetPin passPin={setPin} />
                <div>
                    <button type="submit" value="Paste!" onClick={() => setPasteData()}><span>Paste!</span></button>
                </div>
            </div>
        </div>
    );
}

export default PasteMAQ;

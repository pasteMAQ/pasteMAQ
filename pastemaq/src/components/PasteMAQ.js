import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";

const PasteMAQ = () => {
    const navigate = useNavigate();
    var datemap = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [text, setText] = useState('');
    const [pasteId, setPasteId] = useState();

    useEffect(() => {
        var date = new Date();
        date.setDate(date.getDate() + 60)
        setExpiryDate(date);
        setPasteId(nanoid(9));
    }, []);

    function handleChange(event) {
        setText(event.target.value);
    }

    const handleClick = () => {
        var data = {
            "content": text,
            "expiryDate": expiryDate,
            "pasteId": pasteId
        };
        fetch('http://localhost:5005/paste', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
            .then(data => {
                navigate("/view-paste/" + pasteId)
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );
    }

    return (
        <div>
            <textarea name="code" rows="10" cols="80" style={{ height: '170px' }} value={text} onChange={handleChange}></textarea>
            <div>
                <h5>This paste will expire by default on <span id="time">{datemap[expiryDate?.getMonth() + 1] + " " + expiryDate?.getDate() + ", " + expiryDate?.getFullYear()}</span></h5>
                <h5>Select Expiry Date <input type="date" value={expiryDate} onChange={(event) => setExpiryDate(new Date(event.target.value))} /></h5>
                <div>
                    <button type="submit" value="Paste!" onClick={() => handleClick()}><span>Paste!</span></button>
                </div>
            </div>
        </div>
    );
}

export default PasteMAQ;

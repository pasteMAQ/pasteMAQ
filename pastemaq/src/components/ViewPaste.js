import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

const ViewPaste = ({pasteId}) => {
    const [text, setText] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState();

    const fetchPasteData = async () => {
        const options = {
            method: "GET",
            headers: new Headers({ "Content-Type": "application/json; charset=utf-8" })
        };
        const response = await fetch('https://paste-maq-server.vercel.app/view-paste/' + pasteId,
            options
        );
        const data = await response.json();
        setText(data.content);
        setExpiryDate(new Date(data.expiryDate));
    }

    useEffect(() => {
        fetchPasteData()
    }, []);

    var datemap = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };

    const copyToClipboard = e => {
        navigator.clipboard.writeText(window.location.toString())
    }

    return text == ''? <Loader /> : (
        <div>
            <div className='paste-id'>Paste # {pasteId}</div>
            <textarea disabled rows="10" cols="80" style={{ height: '170px' }} value={text}></textarea>
            <div className="details">
                <h6 className="note">This paste will expire on {datemap[expiryDate?.getMonth() + 1] + " " + expiryDate?.getDate() + ", " + expiryDate?.getFullYear()}</h6>
                <input className="copy-button" type="button" value="Copy Url" onClick={() => copyToClipboard()} />
            </div>
        </div>
    );
};

export default ViewPaste;

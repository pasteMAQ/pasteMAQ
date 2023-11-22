const express = require("express", cors = require('cors'));
var bodyParser = require('body-parser')
const { db } = require('./config')


// Initialize Express
const app = express();

app.use(cors({
    origin: ['https://paste-maq.vercel.app', 'https://paste-maq-server.vercel.app']
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/paste", async (req, res) => {
    const data = req.body;
    const dbRefString = `pastes/${data.pasteId}`;
    const ref = db.ref(dbRefString);
    try {
        await ref.set(data);
        res.send({ msg: "Paste Added" });
    }
    catch (err) {
        console.log(err);
    }
});

app.get("/view-paste/:pasteId", async (req, res) => {
    const dbRefString = `pastes/${req.params.pasteId}`;
    const snapshot = await db.ref(dbRefString).once("value").then((snapshot) => {
        return snapshot;
    });
    res.send(snapshot.val());
});

app.get("/validate-pin/:pasteId/:pin", async (req, res) => {
    const dbRefString = `pastes/${req.params.pasteId}`;
    const snapshot = await db.ref(dbRefString).once("value").then((snapshot) => {
        return snapshot;
    });
    if (snapshot.val().pastePin === req.params.pin) {
        res.send({ msg: "Pin Matched", matched: true });
    }
    else {
        res.send({ msg: "Pin Not Matched", matched: false });
    }
});

app.get("/validate-paste/:pasteId", async (req, res) => {
    const dbRefString = `pastes/${req.params.pasteId}`;
    const snapshot = await db.ref(dbRefString).once("value").then((snapshot) => {
        return snapshot;
    });
    if (snapshot.val().pastePin !== "") {
        res.send({ msg: "No pin needed", found: true });
    }
    else {
        res.send({ msg: "Pin required", found: false });
    }
});

// Initialize server
app.listen(5005, () => {
    console.log("Running on port 5005.");
});

module.exports = app;
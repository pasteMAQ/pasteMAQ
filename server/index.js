const express = require("express", cors = require('cors'));
var bodyParser = require('body-parser')
const { db } = require('./config')


// Initialize Express
const app = express();

app.use(cors({
    origin: ['https://paste-maq.vercel.app', 'https://paste-maq-server.vercel.app', 'http://localhost:3000']
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/paste", async (req, res) => {
    console.log("reached");
    const data = req.body;
    const dbRefString = `pastes/${data.pasteId}`;
    const ref = db.ref(dbRefString);
    try {
        await ref.set(data);
        console.log(ref.err);
        res.send({ msg: "Paste Added" });
        console.log("done");
    }
    catch (err) {
        console.log(err);
    }
    console.log("done");
});

app.get("/view-paste/:pasteId", async (req, res) => {
    console.log("reached view-paste");
    const dbRefString = `pastes/${req.params.pasteId}`;
    console.log(dbRefString);
    const snapshot = await db.ref(dbRefString).once("value").then((snapshot) => {
        return snapshot;
    });
    console.log(snapshot.val());
    res.send(snapshot.val());
});

app.get("/validate-pin/:pasteId/:pin", async (req, res) => {
    console.log("reached validate-pin");
    const dbRefString = `pastes/${req.params.pasteId}`;
    console.log(dbRefString);
    const snapshot = await db.ref(dbRefString).once("value").then((snapshot) => {
        return snapshot;
    });
    console.log(snapshot.val());
    if (snapshot.val().pastePin === req.params.pin) {
        res.send({ msg: "Pin Matched", matched: true });
    }
    else {
        res.send({ msg: "Pin Not Matched", matched: false });
    }
});

// Initialize server
app.listen(5005, () => {
    console.log("Running on port 5005.");
});

module.exports = app;
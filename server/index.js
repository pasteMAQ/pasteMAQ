const express = require('express', cors = require('cors'));
var bodyParser = require('body-parser')
const {db} = require('./config')


// Initialize Express
const app = express();

app.use(cors({
  origin: '*'
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/paste", async (req, res) => {
  console.log("reached");
  const data = req.body;
const dbRefString = `pastes/${data.pasteId}`;
const ref = db.ref(dbRefString);
await ref.set(data);
  res.send({ msg: "User Added" });
});

app.get("/view-paste/:pasteId", async (req, res) => {
  const dbRefString = `pastes/${req.params.pasteId}`;
  console.log(dbRefString);
  const snapshot = await db.ref(dbRefString).once("value").then((snapshot) => {
    return snapshot;
  });
  console.log(snapshot.val());
  res.send(snapshot.val());
});

// Initialize server
app.listen(5005, () => {
  console.log("Running on port 5005.");
});

module.exports = app;
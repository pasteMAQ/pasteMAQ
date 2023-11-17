var admin = require("firebase-admin");

var serviceAccount = require("./pastemaq-5e002-firebase-adminsdk-g6c01-69f0548465.json");

const fbApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pastemaq-5e002-default-rtdb.firebaseio.com"
});

const db = fbApp.database();
const dbFS = fbApp.firestore();
const dbTSRef = admin.firestore;
const dbFBRTRef = fbApp.database;
module.exports = { db, dbFS, dbTSRef, dbFBRTRef };
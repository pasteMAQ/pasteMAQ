// const firebase = require("firebase-admin");
// const firebaseConfig = {
//   apiKey: "AIzaSyALWKt1xErftGr4YaqeKlaAMyl2bCZr1k0",
//   authDomain: "pastemaq-5e002.firebaseapp.com",
//   projectId: "pastemaq-5e002",
//   storageBucket: "pastemaq-5e002.appspot.com",
//   messagingSenderId: "911212112600",
//   appId: "1:911212112600:web:00441bc5163aa741c485ad",
//   measurementId: "G-BTZN1SLY2J"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const User = db.collection("Users");
// module.exports = User;

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
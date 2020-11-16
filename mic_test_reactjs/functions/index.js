const functions = require("firebase-functions");
const app = require("express")();

const config = {
  apiKey: "AIzaSyDNV3VNJxiqxcGWJJv3-ClrNSplSMnkJ4A",
  authDomain: "mictest-7dd37.firebaseapp.com",
  databaseURL: "https://mictest-7dd37.firebaseio.com",
  projectId: "mictest-7dd37",
  storageBucket: "mictest-7dd37.appspot.com",
  messagingSenderId: "898308860024",
  appId: "1:898308860024:web:6a614630c965eecf2fa58d",
  measurementId: "G-HDN86Q140W",
};

const firebase = require("firebase");
firebase.initializeApp(config);

// Users Auth
app.use("/auth", require("./APIs/users"));

exports.api = functions.https.onRequest(app);

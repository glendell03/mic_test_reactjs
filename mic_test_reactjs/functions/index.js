const functions = require("firebase-functions");
const app = require("express")();



// Users Auth
app.use("/auth",require("./APIs/users"));

exports.api = functions.https.onRequest(app);

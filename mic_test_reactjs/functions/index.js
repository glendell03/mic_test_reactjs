const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

// Users Auth
app.use(cors()); // VERY IMPORTANT FOR CLIENT SIDE
app.use("/auth", require("./APIs/users"));
exports.api = functions.https.onRequest(app);

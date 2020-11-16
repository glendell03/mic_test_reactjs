const admin = require("firebase-admin"); // ETO
admin.initializeApp();

const db = admin.firestore(); // ETO NEED KO

module.exports = db;

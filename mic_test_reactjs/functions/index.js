const functions = require("firebase-functions");
const app = require("express")();
const { body, validationResult } = require("express-validator");

const admin = require("firebase-admin");
admin.initializeApp();

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
const { default: validator } = require("validator");
firebase.initializeApp(config);

const db = admin.firestore();

// Register Route
app.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const { email, password, confirmPassword, handle } = req.body;
    const newUser = {
      email,
      password,
      confirmPassword,
      handle,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const doc = await db.doc(`/users/${handle}`).get();
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      }
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      const userId = await data.user.uid;
      const token = await data.user.getIdToken();
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };

      await db.doc(`/users/${newUser.handle}`).set(userCredentials);
      return await res.status(201).json({ token });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email already in user" });
      }
      return res.status(500).json({ errro: err.code });
    }
  }
);

exports.api = functions.https.onRequest(app);

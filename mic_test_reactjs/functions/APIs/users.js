const { db } = require("../db");
const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "Invalid Email Address").isEmail(),
    check("password", "Password must be 8 characters long").isLength({
      min: 8,
    }),
    check("confirmPassword", "Password must match").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password did not match");
      }
      return true;
    }),
    check("handle", "Must not be empty").not().isEmpty(),
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

module.exports = router;

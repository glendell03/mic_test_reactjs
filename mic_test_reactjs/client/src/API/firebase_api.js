const axios = require("axios").default;

export const FIREBASE_API = axios.create({
  baseURL: "http://localhost:5000/mictest-7dd37/us-central1/api",
});

const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./keys/firebase_key.json");

if (getApps().length < 1) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();

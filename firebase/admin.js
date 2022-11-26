import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// const serviceAccount = require("./firebase-keys.json");

let app;

console.log(
  "********* FIREBASE_ADMIN_CONFIG *****",
  process.env.FIREBASE_ADMIN_CONFIG
);
// .replace(/\\n/gm, "\n")

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);

// console.log("********* serviceAccount *****", serviceAccount);
try {
  app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  });
  console.log("***** ///// firebase initialized ///// *******");
} catch (e) {
  console.log("ERROR : ", e);
}

export const firestore = getFirestore(app);

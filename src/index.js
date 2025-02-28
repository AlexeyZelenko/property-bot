import 'dotenv/config';
import express from 'express';
import { handleMessage } from './handlers/messageHandler.js';
import { handleCallback } from './handlers/callbackHandler.js';
import fs from 'fs';
import admin from "firebase-admin";


const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "firebase-adminsdk-5v5il@friendlychat-you-tube-short.iam.gserviceaccount.com";

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Firebase service account file not found at: ${serviceAccountPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: process.env.FIREBASE_DATABASE_URL || "https://friendlychat-you-tube-short.firebaseio.com"
});

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const update = req.body;
    console.log("Received update:", JSON.stringify(update, null, 2));

    if (update.message) {
      await handleMessage(update.message);
    } else if (update.callback_query) {
      await handleCallback(update.callback_query);
    } else {
      console.warn("Unknown update format:", update);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling update:', error);
    res.sendStatus(500);
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
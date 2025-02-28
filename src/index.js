import 'dotenv/config';
import express from 'express';
import { handleMessage } from './handlers/messageHandler.js';
import { handleCallback } from './handlers/callbackHandler.js';
import admin from 'firebase-admin';
import fs from 'fs';

console.log('TELEGRAM_TOKEN:', process.env.TELEGRAM_TOKEN);
console.log("🚀 Starting Telegram Bot Server...");

console.log("process.env", process.env)

// Загружаем Firebase Credentials
let serviceAccount;

if (process.env.FIREBASE_CREDENTIALS) {
  console.log("✅ Используем ключ Firebase из переменной окружения");
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  } catch (err) {
    console.error("❌ Ошибка: Некорректный JSON в FIREBASE_CREDENTIALS", err);
    process.exit(1);
  }
} else {
  const credentialsPath = '/app/serviceAccountKey.json' || './serviceAccountKey.json' || process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!fs.existsSync(credentialsPath)) {
    console.error(`❌ Ошибка: Файл с ключами Firebase не найден: ${credentialsPath}`);
    process.exit(1);
  }

  console.log("✅ Firebase credentials file found!");

  try {
    serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  } catch (err) {
    console.error("❌ Ошибка: Не удалось прочитать файл ключа Firebase", err);
    process.exit(1);
  }
}

// Инициализация Firebase
console.log("⚡ Initializing Firebase...");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("✅ Firebase initialized successfully!");

const app = express();
app.use(express.json());

// Вебхук для Telegram бота
app.post("/webhook", async (req, res) => {
  try {
    const update = req.body;
    console.log("📩 Received update:", JSON.stringify(update, null, 2));

    if (update.message) {
      console.log("💬 Handling message event...");
      await handleMessage(update.message);
    } else if (update.callback_query) {
      console.log("🔘 Handling callback query...");
      await handleCallback(update.callback_query);
    } else {
      console.warn("⚠️ Unknown update format:", update);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error handling update:", error);
    res.sendStatus(500);
  }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("🤖 Telegram bot is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

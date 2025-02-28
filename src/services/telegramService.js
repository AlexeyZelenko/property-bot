import axios from 'axios';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

if (!TELEGRAM_TOKEN) {
  throw new Error('TELEGRAM_TOKEN is not set in environment variables');
}

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export const sendMessage = async (chatId, text, options = {}) => {
  try {
    const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      ...options
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', {
      statusCode: error.response?.status,
      message: error.response?.data || error.message,
      chatId,
      text: text.substring(0, 100) // Log only first 100 chars for privacy
    });
    throw error;
  }
};

export const editMessage = async (chatId, messageId, text, options = {}) => {
  try {
    const response = await axios.post(`${TELEGRAM_API}/editMessageText`, {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
      ...options
    });
    return response.data;
  } catch (error) {
    console.error('Error editing message:', {
      statusCode: error.response?.status,
      message: error.response?.data || error.message,
      chatId,
      messageId
    });
    throw error;
  }
};

export const answerCallbackQuery = async (callbackQueryId, text, options = {}) => {
  try {
    const response = await axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
      callback_query_id: callbackQueryId,
      text,
      ...options
    });
    return response.data;
  } catch (error) {
    console.error('Error answering callback query:', {
      statusCode: error.response?.status,
      message: error.response?.data || error.message,
      callbackQueryId
    });
    throw error;
  }
};

// Helper function to escape HTML special characters
export const escapeHTML = (text) => {
  return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
};
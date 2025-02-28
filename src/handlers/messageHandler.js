import { sendMessage } from '../services/telegramService.js';
import { getMainMenuKeyboard, getPropertyTypeKeyboard } from '../utils/keyboards.js';

export const handleMessage = async (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  switch (text) {
    case '/start':
      return await sendMessage(chatId, 
        `Вітаємо, ${message.from.first_name}! Оберіть тип нерухомості:`,
        { reply_markup: getPropertyTypeKeyboard() }
      );

    case '/menu':
      return await sendMessage(chatId,
        'Головне меню:',
        { reply_markup: getMainMenuKeyboard() }
      );

    default:
      return await sendMessage(chatId,
        `Привіт, ${message.from.first_name}! Ви написали: ${text}`,
        { reply_markup: getMainMenuKeyboard() }
      );
  }
};
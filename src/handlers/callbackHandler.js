import { editMessage, answerCallbackQuery } from '../services/telegramService.js';
import { getProperties } from '../services/propertyService.js';
import {
  getApartmentOptionsKeyboard,
  getHouseOptionsKeyboard,
  getPropertyTypeKeyboard,
  getTransactionTypeKeyboard, getMainMenuKeyboard
} from '../utils/keyboards.js';


export const handleCallback = async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  const mapProperties = {
    "apartments": "Квартири",
    "houses": "Будинки",
    "rent": "Оренда",
    "sell": "Продаж",
    "exchange": "Обмін",
    "daily": "Подобово",
  };

  const replaceProperties = (str) => {
    for (const key in mapProperties) {
      str = str.replace(new RegExp(key, 'g'), mapProperties[key]);
    }
    return str;
  }

  console.log(`📩 Отримано callback: ${data} (чат: ${chatId})`);

  if (data === "back_to_main") {
    await editMessage(chatId, messageId, "🔙 Повертаємось в головне меню", getMainMenuKeyboard());
  }

  // Вибір типу нерухомості
  if (['apartments', 'houses'].includes(data)) {
    console.log(`🏠 Вибрано тип нерухомості: ${replaceProperties(data)}`);
    return await editMessage(chatId, messageId, 'Оберіть тип угоди:', {
      reply_markup: getTransactionTypeKeyboard(data),
    });
  }

  const parts = data.split('_');

  // Вибір типу угоди
  if (parts.length === 2) {
    const [propertyType, transactionType] = parts;

    console.log(`💼 Вибрано тип угоди: ${transactionType} для ${propertyType}`);

    if (!['sell', 'rent', 'exchange', 'daily'].includes(transactionType)) {
      console.warn(`⚠️ Помилка: невідомий тип угоди (${transactionType})`);
      return await answerCallbackQuery(callbackQuery.id, 'Помилка: невідомий тип угоди');
    }

    let keyboard;
    switch (propertyType) {
      case 'apartments':
        keyboard = getApartmentOptionsKeyboard(transactionType);
        break;
      case 'houses':
        keyboard = getHouseOptionsKeyboard(transactionType);
        break;
      default:
        console.warn(`⚠️ Помилка: невідома категорія (${propertyType})`);
        return await answerCallbackQuery(callbackQuery.id, 'Помилка: невідома категорія');
    }

    console.log(`📌 Завантаження клавіатури для ${propertyType} - ${transactionType}`);
    return await editMessage(
        chatId,
        messageId,
        `Оберіть варіант у категорії "${replaceProperties(propertyType)}" - ${replaceProperties(transactionType)}:`,
        { reply_markup: keyboard }
    );
  }

  // Вибір підкатегорії нерухомості
  if (parts.length === 3) {
    const [propertyType, transactionType, subtype] = parts;

    console.log(`🔍 Вибрано підтип: ${replaceProperties(subtype)} (${replaceProperties(propertyType)} - ${transactionType})`);

    if (!subtype) {
      console.warn('⚠️ Помилка: відсутній підтип');
      return await answerCallbackQuery(callbackQuery.id, 'Помилка: відсутній підтип');
    }

    const properties = await getProperties(propertyType, transactionType, subtype) || [];

    if (properties.length === 0) {
      console.warn(`❌ Немає доступних варіантів для ${replaceProperties(subtype)}`);
      return await answerCallbackQuery(callbackQuery.id, 'На жаль, зараз немає доступних варіантів');
    }

    const propertyList = formatPropertyList(properties);
    const messageText = `✅ Знайдено ${properties.length} варіантів для ${replaceProperties(subtype)} кімнат:\n\n${propertyList}`;

    console.log(messageText);

    return await editMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id, messageText);
  }
};

const formatPropertyList = (properties, limit = 5) => {
  return properties
      .slice(0, limit)
      .map((p, index) => `${index + 1}. ${p.address.area.name} - ${p.price}$, ${p.apartmentArea.totalArea}м²`)
      .join('\n');
};

export const getTransactionTypeKeyboard = (propertyType) => ({
  inline_keyboard: [
    [{ text: "💰 Продаж", callback_data: `${propertyType}_sell` }],
    [{ text: "🏠 Оренда", callback_data: `${propertyType}_rent` }],
    [{ text: "🔄 Обмін", callback_data: `${propertyType}_exchange` }],
    [{ text: "⏳ Погодинно", callback_data: `${propertyType}_daily` }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});

export const getPropertyTypeKeyboard = () => ({
  inline_keyboard: [
    [{ text: "🏢 Квартири", callback_data: "apartments" }],
    [{ text: "🏡 Будинки", callback_data: "houses" }],
    [{ text: "🏬 Комерційна нерухомість", callback_data: "commercial" }]
  ]
});

export const getMainMenuKeyboard = () => ({
  keyboard: [
    [{ text: "🔍 Пошук нерухомості" }, { text: "❤️ Мої улюблені" }],
    [{ text: "🔥 Останні пропозиції" }, { text: "📞 Зв'язатися з менеджером" }]
  ],
  resize_keyboard: true
});

export const getApartmentOptionsKeyboard = () => ({
  inline_keyboard: [
    [{ text: "1️⃣ 1-кімнатні", callback_data: "apartments_sell_1" }],
    [{ text: "2️⃣ 2-кімнатні", callback_data: "apartments_sell_2" }],
    [{ text: "3️⃣ 3+ кімнатні", callback_data: "apartments_sell_3" }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});

export const getHouseOptionsKeyboard = () => ({
  inline_keyboard: [
    [{ text: "🏠 Приватні будинки", callback_data: "houses_sell_private" }],
    [{ text: "🏘️ Таунхауси", callback_data: "houses_sell_town" }],
    [{ text: "🏕️ Дачі", callback_data: "houses_sell_country" }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});

export const getCommercialOptionsKeyboard = () => ({
  inline_keyboard: [
    [{ text: "🏢 Офіси", callback_data: "commercial_sell_office" }],
    [{ text: "🛒 Магазини", callback_data: "commercial_sell_store" }],
    [{ text: "🏭 Склади", callback_data: "commercial_sell_warehouse" }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});

export const getTransactionTypeKeyboard = (propertyType) => ({
  inline_keyboard: [
    [{ text: "💰 Продаж", callback_data: `${propertyType}_sell` }],
    [{ text: "🏠 Оренда", callback_data: `${propertyType}_rent` }],
    [{ text: "🔄 Обмін", callback_data: `${propertyType}_exchange` }],
    [{ text: "⏳ Подобово", callback_data: `${propertyType}_daily` }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});

export const getPropertyTypeKeyboard = () => ({
  inline_keyboard: [
    [{ text: "🏢 Квартири", callback_data: "apartments" }],
    [{ text: "🏡 Будинки", callback_data: "houses" }]
  ]
});

export const getMainMenuKeyboard = () => ({
  keyboard: [
    [
      { text: "🔍 Пошук нерухомості" },
      { text: "❤️ Мої улюблені" }
    ],
    [
      { text: "🔥 Останні пропозиції" },
      { text: "📞 Зв'язатися з менеджером" }
    ]
  ],
  resize_keyboard: true
});

export const getApartmentOptionsKeyboard = () => ({
  inline_keyboard: [
    [{ text: "1️⃣ 1-кімнатні", callback_data: "apartments_sell_1" }],
    [{ text: "2️⃣ 2-кімнатні", callback_data: "apartments_sell_2" }],
    [{ text: "3️⃣ 3 кімнатні", callback_data: "apartments_sell_3" }],
    [{ text: "3️⃣ 4 кімнатні", callback_data: "apartments_sell_4" }],
    [{ text: "3️⃣ 5 кімнатні", callback_data: "apartments_sell_5" }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});

export const getHouseOptionsKeyboard = () => ({
  inline_keyboard: [
    [{ text: "1️⃣ 1-кімнатні", callback_data: "apartments_sell_1" }],
    [{ text: "2️⃣ 2-кімнатні", callback_data: "apartments_sell_2" }],
    [{ text: "3️⃣ 3 кімнатні", callback_data: "apartments_sell_3" }],
    [{ text: "3️⃣ 4 кімнатні", callback_data: "apartments_sell_4" }],
    [{ text: "3️⃣ 5 кімнатні", callback_data: "apartments_sell_5" }],
    [{ text: "⬅️ Назад", callback_data: "back_to_main" }]
  ]
});
export default {
  adminActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Начать отслеживать", callback_data: "startFollow" }],
        [{ text: "Перестать отслеживать", callback_data: "stopFollow" }],
        [{ text: "Редактировать", callback_data: "useEditMode" }],
        [
          {
            text: "Отправить сообщение всем юзерам",
            callback_data: "sendGlobalMessage",
          },
        ],
      ],
    }),
  },
  moderatorActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Начать отслеживать", callback_data: "startFollow" }],
        [{ text: "Перестать отслеживать", callback_data: "stopFollow" }],
      ],
    }),
  },
  userActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Начать отслеживать", callback_data: "startFollow" }],
        [{ text: "Перестать отслеживать", callback_data: "stopFollow" }],
      ],
    }),
  },

  adminActionEditDB: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Валютные пары", callback_data: "editCurrency" }],
        [{ text: "Акции", callback_data: "editSecurity" }],
        [{ text: "Назад", callback_data: "backToShowActions" }],
      ],
    }),
  },
  adminActionEditCurrencies: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Добавить пару", callback_data: "addCurrency" }],
        [{ text: "Редактировать пару", callback_data: "changeCurrency" }],
        [{ text: "Удалить пару", callback_data: "removeCurrency" }],
        [{ text: "Назад", callback_data: "backToAdminEditDB" }],
      ],
    }),
  },
  adminActionEditCurrenciesFields: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Название пары", callback_data: "editCurrencyName" }],
        [{ text: "API ключ пары", callback_data: "editCurrencyAPIKey" }],
        [{ text: "Все поля пары", callback_data: "editCurrencyAllFields" }],
      ],
    }),
  },
  adminActionEditSecurities: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Добавить акцию", callback_data: "addSecurity" }],
        [{ text: "Редактировать акцию", callback_data: "changeSecurity" }],
        [{ text: "Удалить акцию", callback_data: "removeSecurity" }],
        [{ text: "Назад", callback_data: "backToAdminEditDB" }],
      ],
    }),
  },
  adminActionEditSecuritiesFields: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Название акции", callback_data: "editSecurityName" }],
        [{ text: "API ключ акции", callback_data: "editSecurityAPIKey" }],
        [{ text: "Все поля акции", callback_data: "editSecurityAllFields" }],
      ],
    }),
  },

  allActionShowAllUnfollowed: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Валютные пары", callback_data: "showUnfollowedCurrency" }],
        [{ text: "Акции", callback_data: "showUnfollowedSecurity" }],
        [{ text: "Назад", callback_data: "backToShowActions" }],
      ],
    }),
  },
  allActionShowFollowed: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Валютные пары", callback_data: "showFollowedCurrency" }],
        [{ text: "Акции", callback_data: "showFollowedSecurity" }],
        [{ text: "Назад", callback_data: "backToShowActions" }],
      ],
    }),
  },
};

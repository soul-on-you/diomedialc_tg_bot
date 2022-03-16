import TelegramBot from "node-telegram-bot-api";
import MoexAPI from "moex-api";
import { CronTask } from "./cron_task";
import { token } from "./bot_api_token";
import { MoexCurrency, MoexSecurities } from "./moex";
import sequelize from "./db_connection";
import {
  Users as UsersModel,
  UserСurrencies as UserСurrenciesModel,
  Сurrencies as CurrencyModel,
  UserMessages as UserMessagesModel,
} from "./db_models";
import BotOptions from "./bot_options";
import { MoexCurrencyUpdateTask } from "./cron-moex";

const bot = new TelegramBot(token, { polling: true });

const states = {};
const users = {};
const currency = {};

// const getUsers = async (users) => {
//   try {
//     return await (
//       await UsersModel.findAll()
//     )
//       .filter((user) => user.status)
//       .map(async (user) => {
//         await (
//           await UserСurrenciesModel.findAll({
//             where: { chatID: await user.chatID },
//           })
//         ).map(async (currecyLog) => {
//           if (
//             users[await user.chatID] == null //||
//             // (await users[await user.chatID].currencies) == null
//           ) {
//             // await console.log(await users[await user.chatID]);
//             console.log("cleared");
//             users[user.chatID] = {
//               ...users[user.chatID],
//               currencies: [],
//             };
//             // await console.log(await users[await user.chatID]);
//           }
//           console.log(users[user.chatID]);

//           users[user.chatID] = await {
//             currencies: [
//               // await // // ((await users[await user.chatID]) != null
//               // ...users[await user.chatID].currency,
//               // //   : null),
//               ...users[user.chatID].currencies,
//               await (
//                 await CurrencyModel.findOne({
//                   where: { id: await currecyLog.currencyID },
//                 })
//               ).currencyName,
//             ],
//           };
//           return await users[user.chatID];
//         });
//       });
//   } catch (e) {
//     console.error(e);
//   }
// };

const getUsers = async (users) => {
  try {
    return await (
      await UsersModel.findAll()
    )
      .filter((user) => user.status)
      .map(async (user) => {
        users[user.chatID] = await {
          ...users[user.chatID],
          currencies: [],
        };
        await (
          await UserСurrenciesModel.findAll({
            where: { chatID: await user.chatID },
          })
        ).map(async (currecyLog) => {
          // if (
          //   users[user.chatID] == null //||
          //   // (await users[await user.chatID].currencies) == null
          // ) {
          //   // await console.log(await users[await user.chatID]);
          //   console.log("cleared");
          //   users[user.chatID] = {
          //     ...users[user.chatID],
          //     currencies: [],
          //   };
          //   // await console.log(await users[await user.chatID]);
          // }
          const currencyName = await (
            await CurrencyModel.findOne({
              where: { id: currecyLog.currencyID },
            })
          ).currencyName;
          users[user.chatID] = await {
            ...users[user.chatID],
            currencies: [
              // await // // ((await users[await user.chatID]) != null
              // ...users[await user.chatID].currency,
              // //   : null),
              ...users[user.chatID].currencies,
              await currencyName,
            ],
          };
          // return await users[user.chatID];
        });
      });
  } catch (e) {
    console.error(e);
  }
};

const getUsersMessages = async (users) => {
  try {
    return (await UsersModel.findAll())
      .filter((user) => user.status)
      .map(async (user) => {
        const messageID = await (
          await UserMessagesModel.findOne({
            where: { chatID: user.chatID },
          })
        )?.messageID;

        // const message = await UserMessagesModel.findOne({
        //   where: { chatID: user.chatID },
        // });

        // await UserMessagesModel.findOne({
        //   where: { chatID: user.chatID },
        // }).then((message) => console.log(message?.messageID));

        // console.log(message.messageID);

        users[user.chatID] = await {
          ...users[user.chatID],
          messageID: await messageID,
        };

        // const messageID = await UserMessagesModel.findOne({
        //   where: { chatID: user.chatID },
        // });
        // await console.log(await messageID.messageID);
        // return

        // users[user.chatID] = await {
        //   ...users[user.chatID],
        //   messageID: await messageID,
        // };

        // await UserMessagesModel.findOne({
        //   where: { chatID: user.chatID },
        // }).then((userMessages) => {
        //   console.log(userMessages.messageID);
        // });

        // users[user.chatID] = await {
        //   ...users[user.chatID],
        //   messageID: await messageID,
        // };

        // const currencyName = await (
        //   await CurrencyModel.findOne({
        //     where: { id: currecyLog.currencyID },
        //   })
        // ).currencyName;
        // users[user.chatID] = await {
        //   messageID: [
        //     // await // // ((await users[await user.chatID]) != null
        //     // ...users[await user.chatID].currency,
        //     // //   : null),
        //     ...users[user.chatID].messageID,
        //     await currencyName,
        //   ],
        // };);
      });
  } catch (e) {
    console.error(e);
  }
};

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error("Подключение к БД не выполнилось!\n", e);
  }
  /////DEBUG/////
  await getUsers(users);
  await getUsersMessages(users);
  setTimeout(() => console.log("\nUser:\n", users), 3000);
  const moexCurrencyUpdateTask = MoexCurrencyUpdateTask(
    (await CurrencyModel.findAll()).map((currency) => {
      return { name: currency.currencyName, API: currency.currencyAPI };
    }),
    currency,
    10,
    19
  );
  (await moexCurrencyUpdateTask).start();
  setTimeout(() => console.log("\nUser:\n", currency), 7000);
  // setTimeout(() => console.log("\nUser:\n", currency), 12000);
  // setTimeout(() => console.log("\nUser:\n", currency), 17000);
  // setTimeout(() => console.log("\nUser:\n", currency), 22000);
  // setTimeout(() => console.log("\nUser:\n", currency), 27000);
  // setTimeout(() => console.log("\nUser:\n", currency), 32000);
  const UsersUpdateMessage = (/*users*/) => {
    console.log("UsersUpdateMessageTask:\n");
    for (const user in users) {
      if (users[user].messageID) {
        // console.log(users[user]);
        // console.log(currency[users[user].currencies[0]]);
        // console.log(users[user].currencies);
        const message = users[user].currencies.reduce(
          (message, currencyName) => `${message}\n\n${currency[currencyName]}`,
          ""
        );
        console.log(message);

        bot
          .editMessageText(message, {
            message_id: users[user].messageID,
            chat_id: user,
          })
          .catch((error) =>
            console.log(error?.response?.body?.description?.split(":")[1].trim())
          );
        // console.log(currency[])
        // bot.editMessageText()
      }
    }
  };

  const UsersUpdateMessageTask = CronTask(UsersUpdateMessage, 10, 19);

  setTimeout(() => UsersUpdateMessageTask.start(), 5000);
  /////DEBUG/////
  bot.setMyCommands([
    { command: "/start", description: "Авторизировать бота" },
    { command: "/run", description: "Запуск бота" },
    { command: "/action", description: "Выбор действия" },
    { command: "/show", description: "Получить сообщение с котировками" },
    { command: "/wait", description: "Остановить бота" },
    { command: "/stop", description: "Отключить бота" },
  ]);

  bot.on("message", async (msg) => {
    const chatID = await msg.from.id;
    if (msg.text === "/start") {
      try {
        if (chatID == 1731529362) {
          await UsersModel.create({ chatID: chatID, rules: "ADMIN" });
        } else {
          await UsersModel.create({ chatID: chatID });
        }
      } catch (e) {
        if (e.name == "SequelizeUniqueConstraintError") {
          console.error(e);
        } else {
          const eMsg =
            await "Неудалось создать запись нового пользователя в БД! попробуйте позже!\n";
          await console.error(`${eMsg}\n${chatID}\n${e}\n`);
          console.log(e.name);
          return bot.sendMessage(chatID, eMsg);
        }
      }
      await bot.sendSticker(
        chatID,
        `CAACAgIAAxkBAAMnYiouYynylMK9Uv6l5pi5p6VJU8MAAqkAA0aSAS9evFTSF6HhoiME`
      );
      return bot.sendMessage(
        chatID,
        `Привет! ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (msg.text == "/run") {
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        // await UserMessagesModel.create({ chatID: chatID, messageID: });
        if (user === null) {
          return bot.sendMessage(
            chatID,
            "Для начала работы введите команду /start"
          );
        } else {
          user.status = await true;
          await user.save();
          return bot.sendMessage(chatID, `Бот запущен!`);
        }
      } catch (e) {
        const eMsg =
          await `Неудалось редактировать статус пользователя ${chatID} в БД! попробуйте позже!\n`;
        await console.error(`${eMsg}\n${chatID}\n${e}\n`);
        console.log(e.name);
        return bot.sendMessage(chatID, eMsg);
      }
    }
    if (msg.text == "/action") {
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        const message = await "Выберите действие:";
        switch (user.rules) {
          case "ADMIN":
            return bot.sendMessage(chatID, message, BotOptions.adminActions);
          case "MODERATOR":
            return bot.sendMessage(
              chatID,
              message,
              BotOptions.moderatorActions
            );
          case "USER":
            return bot.sendMessage(chatID, message, BotOptions.userActions);
        }
      } catch (e) {
        const eMsg = await "Подключение к БД не выполнилось!\n";
        await console.error(`${eMsg}\n${e}\n`);
        return bot.sendMessage(chatID, eMsg);
      }
    }
    if (msg.text == "/show") {
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        // await UserMessagesModel.create({ chatID: chatID, messageID: });
        if (user === null) {
          return bot.sendMessage(
            chatID,
            "Для начала работы введите команду /start"
          );
        } else {
          user.status = await true;
          await user.save();
        }
      } catch (e) {
        const eMsg =
          await `Неудалось редактировать статус пользователя ${chatID} в БД! попробуйте позже!\n`;
        await console.error(`${eMsg}\n${chatID}\n${e}\n`);
        console.log(e.name);
        return bot.sendMessage(chatID, eMsg);
      }
      try {
        // await UserMessagesModel.create({ chatID: chatID, messageID: });
        return bot
          .sendMessage(chatID, `Формирование отчета...`)
          .then(async (message) => {
            console.log(message);
            const UserMessage = await UserMessagesModel.findOne({
              where: { chatID: chatID },
            });
            if (UserMessage === null) {
              try {
                return UserMessagesModel.create({
                  chatID: chatID,
                  messageID: message.message_id,
                });
              } catch (e) {
                const eMsg = await "Подключение к БД не выполнилось!\n";
                await console.error(`${eMsg}\n${e}\n`);
                return bot.sendMessage(chatID, eMsg);
              }
            } else {
              try {
                UserMessage.messageID = await message.message_id;
                return UserMessage.save();
              } catch (e) {
                const eMsg = await "Подключение к БД не выполнилось!\n";
                await console.error(`${eMsg}\n${e}\n`);
                return bot.sendMessage(chatID, eMsg);
              }
            }
          });
      } catch (e) {
        if (e.name == "SequelizeUniqueConstraintError") {
          console.error(e);
        } else {
          const eMsg =
            await `Неудалось создать запись сообщения пользователя ${chatID} в БД! попробуйте позже!\n`;
          await console.error(`${eMsg}\n${chatID}\n${e}\n`);
          console.log(e.name);
          return bot.sendMessage(chatID, eMsg);
        }
      }
    }
    if (msg.text == "/wait") {
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        if (user === null) {
          return bot.sendMessage(
            chatID,
            "Для начала работы введите команду /start"
          );
        } else {
          user.status = await false;
          await user.save();
          return bot.sendMessage(chatID, `Бот остановлен!`);
        }
      } catch (e) {
        const eMsg =
          await `Неудалось редактировать статус пользователя ${chatID} в БД! попробуйте позже!\n`;
        await console.error(`${eMsg}\n${chatID}\n${e}\n`);
        console.log(e.name);
        return bot.sendMessage(chatID, eMsg);
      }
    }
    if (msg.text == "/stop") {
    }

    await console.log("STATES:\n", states);
    await console.log("MESSAGE", msg);

    if (states[chatID] && states[chatID].runtime == "message") {
      if (states[chatID].command == "addCurrency") {
        states[chatID].command = await "";
        states[chatID].runtime = await "";
        const [currencyName, currencyAPI] = await msg.text.split(":");
        // await console.log(currencyName, currencyAPI);
        try {
          await CurrencyModel.create({
            currencyName: currencyName,
            currencyAPI: currencyAPI,
          });
        } catch (e) {
          if (e.name == "SequelizeUniqueConstraintError") {
            console.error(e);
          } else {
            const eMsg =
              await "Неудалось создать запись нового пользователя в БД!Подключение к БД не выполнилось!\n";
            await console.error(`${eMsg}\n${e}\n`);
            return bot.sendMessage(chatID, eMsg);
          }
        }
        const messageID = await states[chatID].messageID;
        states[chatID] = await {};

        return bot.editMessageText("Выберите действия с базой валютных пар", {
          chat_id: chatID,
          message_id: messageID,
          ...BotOptions.adminActionEditCurrencies,
        });
      }

      if (states[chatID].command == "editCurrency") {
        states[chatID].command = await "";
        states[chatID].runtime = await "";

        try {
          const currency = await CurrencyModel.findOne({
            where: { currencyName: states[chatID].currencyName },
          });
          console.log(currency);
          const ans = await msg.text;
          if (states[chatID].editableField == "Name") {
            currency.currencyName = await ans;
          } else if (states[chatID].editableField == "APIKey") {
            currency.currencyAPI = await ans;
          } else if (states[chatID].editableField == "All") {
            [currency.currencyName, currency.currencyAPI] = await ans.split(
              ":"
            );
          }
          await currency.save();
          const messageID = await states[chatID].messageID;
          states[chatID] = await {};

          return bot.editMessageText("Выберите действия с базой валютных пар", {
            chat_id: chatID,
            message_id: messageID,
            ...BotOptions.adminActionEditCurrencies,
          });
        } catch (e) {
          // ОШИБКИ:
          // Редактирование на уже существующее SequelizeUniqueConstraintError
          // Нарушение ограничения длинны SequelizeDatabaseError
          const eMsg =
            await "Неудалось обратиться к БД для редактирования валютной пары!\n";
          await console.error(`${eMsg}\n${e}\n`);
          return bot.sendMessage(chatID, eMsg);
        }
      }
    }

    return bot.sendMessage(chatID, "Я вас не понимаю");
  });

  bot.on("callback_query", async (msg) => {
    const data = await msg.data,
      chatID = await msg.from.id,
      messageID = await msg.message.message_id;
    console.log(msg);

    if (data == "startFollow") {
      return bot.editMessageText("Что вы хотите добавить в отслеживаемые", {
        chat_id: chatID,
        message_id: messageID,
        ...BotOptions.allActionShowAllUnfollowed,
      });
      // return bot.editMessageReplyMarkup(BotOptions.allActionShowAllUnfollowed, {
      //   chat_id: msg.from.id,
      //   message_id: messageID,
      // });
      // const message = await "Что вы хотите добавить в отслеживаемые";
      // return bot.sendMessage(
      //   chatID,
      //   message,
      //   BotOptions.allActionShowAllUnfollowed
      // );
    }
    if (data == "stopFollow") {
      // const message = await "Что вы хотите удалить из отслеживаемых";
      // return bot.sendMessage(chatID, message, BotOptions.allActionShowFollowed);
      return bot.editMessageText("Что вы хотите удалить из отслеживаемых", {
        chat_id: chatID,
        message_id: messageID,
        ...BotOptions.allActionShowFollowed,
      });
    }
    if (data == "useEditMode") {
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        if (user.rules == "ADMIN") {
          // return bot.sendMessage(
          //   chatID,
          //   "Что вы хотите редактировать",
          //   BotOptions.adminActionEditDB
          // );
          return bot.editMessageText("Что вы хотите редактировать", {
            chat_id: chatID,
            message_id: messageID,
            ...BotOptions.adminActionEditDB,
          });
        } else {
          const eMsg =
            await "У вас недостаточно прав, чтобы совершать редактирование";
          console.error(eMsg);
          // return bot.sendMessage(chatID, eMsg);
          return bot.editMessageText(eMsg, {
            chat_id: chatID,
            message_id: messageID,
          });
        }
      } catch (e) {
        const eMsg =
          await "Неудалось обратиться к базе данных и удостовериться, что вы админ, повторите попытку";
        console.error(eMsg, e);
        return bot.sendMessage(chatID, eMsg);
      }
    }

    if (data == "editCurrency") {
      //добаить проверку на админку и вынести в отдельную функцию
      // states[chatID] = await "editCurrency";
      // return bot.editMessageText("Введите ")
      return bot.editMessageText("Выберите действия с базой валютных пар", {
        chat_id: chatID,
        message_id: messageID,
        ...BotOptions.adminActionEditCurrencies,
      });
    }
    if (data == "editSecurity") {
      //добаить проверку на админку и вынести в отдельную функцию
      // states[chatID] = await "editSecurity";
      return bot.editMessageText("Выберите действия с базой ценных бумаг", {
        chat_id: chatID,
        message_id: messageID,
        ...BotOptions.adminActionEditSecurities,
      });
    }

    if (data == "addCurrency") {
      // добаить проверку на админку и вынести в отдельную функцию
      states[chatID] = await {
        command: "addCurrency",
        runtime: "message",
        messageID: messageID,
      };
      return bot.editMessageText(
        "Чтобы добавить валютную пару введите {пару:api_ключ}",
        {
          chat_id: chatID,
          message_id: messageID,
        }
      );
    }
    if (data == "changeCurrency") {
      // добаить проверку на админку и вынести в отдельную функцию
      // states[chatID] = await "changeCurrency";
      // return bot.editMessageText(
      //   "Чтобы выбрать валютную пару для редактирования введите {пару}",
      //   {
      //     chat_id: chatID,
      //     message_id: messageID,
      //   }
      // );
      // const users = await (
      //   await UsersModel.findAll()
      // ).map((user) => user.dataValues);
      // console.log(users);
      const currency = await (
        await CurrencyModel.findAll()
      ).map((currency) => currency.dataValues.currencyName);
      const currencyOPT = await currency.map((currency) => [
        { text: currency, callback_data: currency },
      ]);
      const currencyOptions = await {
        reply_markup: JSON.stringify({
          inline_keyboard: [...currencyOPT],
        }),
      };
      // console.log(currency);
      // console.log(currencyOPT);
      console.log(currencyOptions);

      states[chatID] = await {
        command: "editCurrency",
        runtime: "callback_data",
        messageID: messageID,
      };

      return bot.editMessageText(
        "Выберите пару которую хотите отредактировать",
        {
          chat_id: chatID,
          message_id: messageID,
          ...currencyOptions,
        }
      );
    }
    if (data == "editCurrencyName") {
      states[chatID] = await {
        ...states[chatID],
        command: "editCurrency",
        runtime: "message",
        editableField: "Name",
      };
      console.log(states);
      return bot.editMessageText("Введите новое название валютной пары:", {
        chat_id: chatID,
        message_id: messageID,
      });
    }
    if (data == "editCurrencyAPIKey") {
      states[chatID] = await {
        ...states[chatID],
        command: "editCurrency",
        runtime: "message",
        editableField: "APIKey",
      };
      console.log(states);
      return bot.editMessageText(
        "Введите новое значение API ключа валютной пары:",
        {
          chat_id: chatID,
          message_id: messageID,
        }
      );
    }
    if (data == "editCurrencyAllFields") {
      states[chatID] = await {
        ...states[chatID],
        command: "editCurrency",
        runtime: "message",
        editableField: "All",
      };
      console.log(states);
      return bot.editMessageText(
        "Введите новые значения полей валютной пары {пару:api_ключ}:",
        {
          chat_id: chatID,
          message_id: messageID,
        }
      );
    }
    if (data == "removeCurrency") {
      // добаить проверку на админку и вынести в отдельную функцию
      // states[chatID] = await "changeCurrency";
      // return bot.editMessageText(
      //   "Чтобы выбрать валютную пару для редактирования введите {пару}",
      //   {
      //     chat_id: chatID,
      //     message_id: messageID,
      //   }
      // );
      const currency = await (
        await CurrencyModel.findAll()
      ).map((currency) => currency.dataValues.currencyName);
      const currencyOPT = await currency.map((currency) => [
        { text: currency, callback_data: currency },
      ]);
      const currencyOptions = await {
        reply_markup: JSON.stringify({
          inline_keyboard: [...currencyOPT],
        }),
      };
      // console.log(currency);
      // console.log(currencyOPT);
      console.log(currencyOptions);

      states[chatID] = await {
        command: "removeCurrency",
        runtime: "callback_data",
      };

      return bot.editMessageText("Выберите пару которую хотите удалить", {
        chat_id: chatID,
        message_id: messageID,
        ...currencyOptions,
      });
    }

    if (data == "addSecurity") {
    }
    if (data == "changeSecurity") {
    }
    if (data == "removeSecurity") {
    }

    if (data == "backToAdminEditDB") {
    }

    if (data == "backToShowActions") {
      const message = await "Выберите действие:";
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        const options =
          user.rules == "ADMIN"
            ? BotOptions.adminActions
            : user.rules == "MODERATOR"
            ? BotOptions.moderatorActions
            : user.rules == "USER"
            ? BotOptions.userActions
            : null;
        return bot.editMessageText(message, {
          chat_id: chatID,
          message_id: messageID,
          ...options,
        });
      } catch (e) {
        const eMsg = await "Подключение к БД не выполнилось!\n";
        await console.error(`${eMsg}\n${e}\n`);
        await bot.sendMessage(chatID, eMsg);
        return bot.editMessageText(message, {
          chat_id: chatID,
          message_id: messageID,
          ...BotOptions.userActions,
        });
      }
    }

    if (data == "showUnfollowedCurrency") {
      try {
        const userCurrency = await (
          await UserСurrenciesModel.findAll({ where: { chatID: chatID } })
        ).map((row) => row.currencyID);
        console.log(userCurrency);

        const unfollowedCurrency = await (
          await CurrencyModel.findAll()
        )
          .filter((currency) => !userCurrency.includes(currency.id))
          .map((currency) => {
            return [
              {
                text: currency.currencyName,
                callback_data: currency.id,
              },
            ];
          });

        const unfollowedCurrencyOptions = await {
          reply_markup: JSON.stringify({
            inline_keyboard: [...unfollowedCurrency],
          }),
        };

        states[chatID] = await {
          runtime: "callback_data",
          command: "addUnfollowedCurrency",
        };

        // console.log(unfollowedCurrencyOptions);
        // console.log(BotOptions.adminActionEditCurrencies);
        return bot.editMessageText(
          "Выберите валюту которую хотите отслеживать",
          {
            chat_id: chatID,
            message_id: messageID,
            ...unfollowedCurrencyOptions,
          }
        );
      } catch (e) {
        const eMsg = await "Подключение к БД не выполнилось!\n";
        await console.error(`${eMsg}\n${e}\n`);
        await bot.sendMessage(chatID, eMsg);
        return bot.editMessageText("Что вы хотите добавить в отслеживаемые", {
          chat_id: chatID,
          message_id: messageID,
          ...BotOptions.allActionShowAllUnfollowed,
        });
      }
    }
    if (data == "showUnfollowedSecurity") {
    }

    if (data == "showFollowedCurrency") {
      try {
        const userCurrency = await (
          await UserСurrenciesModel.findAll({ where: { chatID: chatID } })
        ).map((row) => row.currencyID);
        console.log(userCurrency);

        const followedCurrency = await (
          await CurrencyModel.findAll()
        )
          .filter((currency) => userCurrency.includes(currency.id))
          .map((currency) => [
            {
              text: currency.currencyName,
              callback_data: currency.id,
            },
          ]);

        const followedCurrencyOptions = await {
          reply_markup: JSON.stringify({
            inline_keyboard: [...followedCurrency],
          }),
        };

        states[chatID] = await {
          runtime: "callback_data",
          command: "removeFollowedCurrency",
        };

        // console.log(unfollowedCurrencyOptions);
        // console.log(BotOptions.adminActionEditCurrencies);
        return bot.editMessageText(
          "Выберите валюту которую хотите перестать отслеживать",
          {
            chat_id: chatID,
            message_id: messageID,
            ...followedCurrencyOptions,
          }
        );
      } catch (e) {
        const eMsg = await "Подключение к БД не выполнилось!\n";
        await console.error(`${eMsg}\n${e}\n`);
        await bot.sendMessage(chatID, eMsg);
        return bot.editMessageText("Что вы хотите добавить в отслеживаемые", {
          chat_id: chatID,
          message_id: messageID,
          ...BotOptions.allActionShowAllUnfollowed,
        });
      }
    }
    if (data == "showFollowedSecurity") {
    }

    if (states[chatID] && states[chatID].runtime == "callback_data") {
      if (states[chatID].command == "editCurrency") {
        states[chatID] = await {
          messageID: messageID,
          currencyName: data,
        };
        return bot.editMessageText("Что вы хотите отредактировать в записи:", {
          chat_id: chatID,
          message_id: messageID,
          ...BotOptions.adminActionEditCurrenciesFields,
        });
      }

      if (states[chatID].command == "removeCurrency") {
        states[chatID] = await {};
        try {
          const currency = await CurrencyModel.findOne({
            where: { currencyName: data },
          });
          console.log(currency);
          await currency.destroy();

          return bot.editMessageText("Выберите действия с базой валютных пар", {
            chat_id: chatID,
            message_id: messageID,
            ...BotOptions.adminActionEditCurrencies,
          });
        } catch (e) {
          const eMsg =
            await "Неудалось обратиться к БД для редактирования валютной пары!\n";
          await console.error(`${eMsg}\n${e}\n`);
          return bot.sendMessage(chatID, eMsg);
        }
      }

      if (states[chatID].command == "addUnfollowedCurrency") {
        try {
          console.log(data);
          await UserСurrenciesModel.create({
            chatID: chatID,
            currencyID: data,
          });
          // return bot.
          return bot.editMessageText("Что вы хотите добавить в отслеживаемые", {
            chat_id: chatID,
            message_id: messageID,
            ...BotOptions.allActionShowAllUnfollowed,
          });
        } catch (e) {
          if (e.name == "SequelizeUniqueConstraintError") {
            console.error(e);
          } else {
            const eMsg =
              await "Неудалось создать запись нового пользователя в БД! попробуйте позже!\n";
            await console.error(`${eMsg}\n${chatID}\n${e}\n`);
            console.log(e.name);
            return bot.sendMessage(chatID, eMsg);
          }
        }
      }
      if (states[chatID].command == "addUnfollowedSecurity") {
      }
      if (states[chatID].command == "removeFollowedCurrency") {
        try {
          // await UserСurrenciesModel.create({
          //   chatID: chatID,
          //   currencyID: data,
          // });
          // return bot.
          const userCurrency = await UserСurrenciesModel.findOne({
            where: { chatID: chatID, currencyID: data },
          });
          console.log(userCurrency);
          userCurrency.destroy();
          return bot.editMessageText(
            "Что вы хотите добавить в перестать отслеживать",
            {
              chat_id: chatID,
              message_id: messageID,
              ...BotOptions.allActionShowAllUnfollowed,
            }
          );
        } catch (e) {
          if (e.name == "SequelizeUniqueConstraintError") {
            console.error(e);
          } else {
            const eMsg =
              await "Неудалось создать запись нового пользователя в БД! попробуйте позже!\n";
            await console.error(`${eMsg}\n${chatID}\n${e}\n`);
            console.log(e.name);
            return bot.sendMessage(chatID, eMsg);
          }
        }
      }
    }
    // if (states[chatID] && states[chatID].command == "addCurrency") {
    //   states[chatID].command = await "";
    //   const [currencyName, currencyAPI] = await msg.text.split(":");
    //   // await console.log(currencyName, currencyAPI);
    //   try {
    //     await CurrencyModel.create({
    //       currencyName: currencyName,
    //       currencyAPI: currencyAPI,
    //     });
    //   } catch (e) {
    //     if (e.name == "SequelizeUniqueConstraintError") {
    //       console.error(e);
    //     } else {
    //       const eMsg =
    //         await "Неудалось создать запись нового пользователя в БД!Подключение к БД не выполнилось!\n";
    //       await console.error(`${eMsg}\n${e}\n`);
    //       return bot.sendMessage(chatID, eMsg);
    //     }
    //   }
    //   return bot.editMessageText("Выберите действия с базой валютных пар", {
    //     chat_id: chatID,
    //     message_id: states[chatID].messageID,
    //     ...BotOptions.adminActionEditCurrencies,
    //   });
    // }
  });
};

start();

// const USDChecker = CronTask(moexUsdTask, 10, 19);

//   bot.on("message", async (msg) => {
//     telegramID = msg.from.id;
//     if (msg.text == "/start") {
//       bot.sendMessage(telegramID, "Отслеживаю USD/RUB...");

//       const replyMarkup = JSON.stringify({
//         inline_keyboard: [[{ text: "Test button" }]],
//       });

//       // bot.sendMessage(telegramID, "Вы хотите отменить?", {
//       //   reply_markup: JSON.stringify({
//       //     keyboard: [
//       //       [
//       //         {
//       //           text: "Да отмена",
//       //           callback_data: "147",
//       //         },
//       //       ],
//       //       [
//       //         {
//       //           text: "Нет, не надо",
//       //           callback_data: "148",
//       //         },
//       //       ],
//       //     ],
//       //   }),
//       // });
//       // job.start();
//       USDChecker.start();
//       // greeting(telegramID, `${msg.from.first_name} ${msg.from.last_name}`);
//       // currentTime(telegramID);
//     } else if (msg.text == "/stop") {
//       bot.sendMessage(telegramID, "Больше не отслеживаю USD/RUB!");
//       USDChecker.stop();
//     }
//   });

// const greeting = (chatID, name) => {
//   bot.sendMessage(chatID, `DiomedialC приветствует вас, ${name}`);
// };

// const currentTime = (chatID) => {
//   bot.sendMessage(chatID, new Date().toString());
// };

import TelegramBot from "node-telegram-bot-api";
import MoexAPI from "moex-api";
import { CronTask } from "./cron_task";
import { token } from "./bot_api_token";
import { MoexCurrency, MoexSecurities } from "./moex";
import sequelize from "./db_connection";
import {
  Users as UsersModel,
  UserСurrencies as UserСurrenciesModel,
  Currency as CurrencyModel,
} from "./db_models";
import BotOptions from "./bot_options";

const bot = new TelegramBot(token, { polling: true });

const states={};

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error("Подключение к БД не выполнилось!\n", e);
  }

  bot.setMyCommands([
    { command: "/start", description: "Авторизировать бота" },
    { command: "/run", description: "Запуск бота" },
    { command: "/action", description: "Выбор действия" },
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

    console.log(msg);
    const ans = bot.sendMessage(chatID, "Я вас не понимаю");

    return console.log((await ans).message_id);
  });

  bot.on("callback_query", async (msg) => {
    const data = await msg.data;
    const chatID = await msg.from.id;
    console.log(msg);

    if (data == "startFollow") {
      return bot.editMessageText("Что вы хотите добавить в отслеживаемые", {
        chat_id: msg.from.id,
        message_id: msg.message.message_id,
        ...BotOptions.allActionShowAllUnfollowed,
      });
      // return bot.editMessageReplyMarkup(BotOptions.allActionShowAllUnfollowed, {
      //   chat_id: msg.from.id,
      //   message_id: msg.message.message_id,
      // });
      // const message = await "Что вы хотите добавить в отслеживаемые";
      // return bot.sendMessage(
      //   chatID,
      //   message,
      //   BotOptions.allActionShowAllUnfollowed
      // );
    }
    if (data == "stopFollow") {
      const message = await "Что вы хотите удалить из отслеживаемых";
      return bot.sendMessage(chatID, message, BotOptions.allActionShowFollowed);
    }
    if (data == "useEditMode") {
      try {
        const user = await UsersModel.findOne({ where: { chatID: chatID } });
        if (user.rules == "ADMIN") {
          return bot.sendMessage(
            chatID,
            "Что вы хотите редактировать",
            BotOptions.adminActionEditDB
          );
        } else {
          const eMsg =
            await "У вас недостаточно прав, чтобы совершать редактирование";
          console.error(eMsg);
          return bot.sendMessage(chatID, eMsg);
        }
      } catch (e) {
        const eMsg =
          await "Неудалось обратиться к базе данных и удостовериться, что вы админ, повторите попытку";
        console.error(eMsg, e);
        return bot.sendMessage(chatID, eMsg);
      }
    }
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

import TelegramBot from "node-telegram-bot-api";
import MoexAPI from "moex-api";
import { CronTask } from "./cron_task";
import { token } from "./bot_api_token";
import { MoexCurrency, MoexStock } from "./moex";
import sequelize from "./db_connection";
import {
  Users as UsersModel,
  UserСurrencies as UserСurrenciesModel,
  Currency as CurrencyModel,
} from "./db_models";

const bot = new TelegramBot(token, { polling: true });

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
    { command: "/find", description: "Остановить бота" },
    { command: "/stop", description: "Отключить бота" },
  ]);

  bot.on("message", async (msg) => {
    const chatID = await msg.from.id;
    try {
      if (msg.text === "/start") {
        if (chatID == 1731529362) {
          await UsersModel.create({ chatID: chatID, rules: "ADMIN" });
        } else {
          await UsersModel.create({ chatID: chatID });
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
    } catch (e) {
      return console.error(
        "Неудалось создать запись нового пользователя в БД!\n",
        e
      );
    }
    return bot.sendMessage(chatID, "Я вас не понимаю");
  });

  const greeting = (chatID, name) => {
    bot.sendMessage(chatID, `DiomedialC приветствует вас, ${name}`);
  };

  const currentTime = (chatID) => {
    bot.sendMessage(chatID, new Date().toString());
  };
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

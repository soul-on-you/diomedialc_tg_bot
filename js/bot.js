import TelegramBot from "node-telegram-bot-api";
import { CronJob as Cron } from "cron";
import MoexAPI from "moex-api";

const token = "5249821549:AAGxewR3c2FpadIT-0aqLvSMnrgaRpHfyZw";
let telegramID;

const moexApi = new MoexAPI();

const bot = new TelegramBot(token, { polling: true });

const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

const formatterRUB = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2,
});

const job = new Cron("0 * * * * *", () => {
  moexApi.securityMarketData("USD000UTSTOM").then((security) => {
    // const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
    const pair = `Пара ${security.securityInfo.SECNAME.split(" ")[2]}`;
    const current = `Текущая цена ${formatterRUB.format(security.node.last)}`;
    const delta = `Изменение курса ${
      security.CHANGE > 0 ? "+" : ""
    }${formatterRUB.format(security.CHANGE)}`;
    const ruVal = `Объем в рублях: ${formatterRUB.format(
      security.VALTODAY_RUR
    )}`;
    const usdVal = `Объем в валюте: ${formatterUSD.format(security.VOLTODAY)}`;
    const mes =
      pair + "\n" + current + "\n" + delta + "\n" + ruVal + "\n" + usdVal;
    bot.sendMessage(telegramID, mes);
  });
});

// job.start();

bot.on("message", (msg) => {
  //   const id = msg.from.id;
  //   console.log(`msg: ${msg.text}\nyour id: ${id}`);
  //   console.log(`msg: ${msg}`);
  //   console.log(msg);
  //   //   const botMessage = msg;
  //   bot.sendMessage(id, msg.text);
  //   //   console.log(moexApi.securityMarketData("SBER"));
  telegramID = msg.from.id;
  if (msg.text == "/start") {
    bot.sendMessage(telegramID, "Отслеживаю USD/RUB...");

    const replyMarkup = JSON.stringify({
      inline_keyboard: [[{ text: "Test button" }]],
    });

    bot.sendMessage(telegramID, "Вы хотите отменить?", {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Да отмена",
              callback_data: "147",
            },
          ],
          [
            {
              text: "Нет, не надо",
              callback_data: "146",
            },
          ],
        ],
      }),
    });
    job.start();
    greeting(telegramID, `${msg.from.first_name} ${msg.from.last_name}`);
    currentTime(telegramID);
  } else if (msg.text == "/stop") {
    bot.sendMessage(telegramID, "Больше не отслеживаю USD/RUB!");
    job.stop();
  }
});

const greeting = (chatID, name) => {
  bot.sendMessage(chatID, `DiomedialC приветствует вас, ${name}`);
};

const currentTime = (chatID) => {
  bot.sendMessage(chatID, new Date().toString());
};

//const s = "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off"
//"https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off&iss.only=boards&boards.columns=secid,is_primary,boardid"
//", "//document//data//rows//row[@is_primary=1]/@boardid")

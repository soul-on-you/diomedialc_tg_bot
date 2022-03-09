// import TelegramBot from "node-telegram-bot-api";
// import { CronJob as Cron } from "cron";
// import MoexAPI from "moex-api";

const TelegramBot = require("node-telegram-bot-api");
const Cron = require("cron").CronJob;
const MoexAPI = require("moex-api");

const token = "5249821549:AAGxewR3c2FpadIT-0aqLvSMnrgaRpHfyZw";
let telegramID;

const moexApi = new MoexAPI();

const bot = new TelegramBot(token, { polling: true });

const job = new Cron("0 * * * * *", () => {
  moexApi.securityMarketData("SBER").then((security) => {
    //   await console.log("security node: ");
    const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
    // console.log(mes);
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
  if (msg.text == "Отслеживать Сбер") {
    bot.sendMessage(telegramID, "Отслеживаю СБЕР...");
    job.start();
  } else if (msg.text == "Не отслеживать Сбер") {
    bot.sendMessage(telegramID, "Больше не отслеживаю СБЕР");
    job.stop();
  }
});

//const s = "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off"
//"https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off&iss.only=boards&boards.columns=secid,is_primary,boardid"
//", "//document//data//rows//row[@is_primary=1]/@boardid")

"use strict";

var _nodeTelegramBotApi = _interopRequireDefault(require("node-telegram-bot-api"));

var _cron = require("cron");

var _moexApi = _interopRequireDefault(require("moex-api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import TelegramBot from "node-telegram-bot-api";
// import { CronJob as Cron } from "cron";
// import MoexAPI from "moex-api";
var token = "5249821549:AAGxewR3c2FpadIT-0aqLvSMnrgaRpHfyZw";
var telegramID;
var moexApi = new _moexApi["default"]();
var bot = new _nodeTelegramBotApi["default"](token, {
  polling: true
});
var job = new _cron.CronJob("0 * * * * *", function () {
  moexApi.securityMarketData("SBER").then(function (security) {
    //   await console.log("security node: ");
    var mes = "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F ".concat(security.securityInfo.SECNAME, "\n\u0410\u043A\u0446\u0438\u0438 ").concat(security.securityInfo.SHORTNAME, "\n\u0422\u0438\u043A\u0435\u0440 ").concat(security.SECID, "\n\u0426\u0435\u043D\u0430 ").concat(security.securityInfo.PREVWAPRICE, "\n\u0421\u0442\u0430\u0442\u0443\u0441 \u0442\u043E\u0440\u0433\u043E\u0432 ").concat(security.TRADINGSTATUS, "\n\u041E\u0431\u044A\u0435\u043C \u0442\u043E\u0440\u0433\u043E\u0432 ").concat(security.VOLTODAY); // console.log(mes);

    bot.sendMessage(telegramID, mes);
  });
}); // job.start();

bot.on("message", function (msg) {
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
}); //const s = "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off"
//"https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off&iss.only=boards&boards.columns=secid,is_primary,boardid"
//", "//document//data//rows//row[@is_primary=1]/@boardid")
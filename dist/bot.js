"use strict";

var _nodeTelegramBotApi = _interopRequireDefault(require("node-telegram-bot-api"));

var _cron = require("cron");

var _moexApi = _interopRequireDefault(require("moex-api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token = "5249821549:AAGxewR3c2FpadIT-0aqLvSMnrgaRpHfyZw";
var telegramID;
var moexApi = new _moexApi["default"]();
var bot = new _nodeTelegramBotApi["default"](token, {
  polling: true
});
var formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2 // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2

});
var formatterRUB = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2
});
var job = new _cron.CronJob("0 * * * * *", function () {
  moexApi.securityMarketData("USD000UTSTOM").then(function (security) {
    // const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
    var pair = "\u041F\u0430\u0440\u0430 ".concat(security.securityInfo.SECNAME.split(" ")[2]);
    var current = "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0446\u0435\u043D\u0430 ".concat(formatterRUB.format(security.node.last));
    var delta = "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430 ".concat(security.CHANGE > 0 ? "+" : "").concat(formatterRUB.format(security.CHANGE));
    var ruVal = "\u041E\u0431\u044A\u0435\u043C \u0432 \u0440\u0443\u0431\u043B\u044F\u0445: ".concat(formatterRUB.format(security.VALTODAY_RUR));
    var usdVal = "\u041E\u0431\u044A\u0435\u043C \u0432 \u0432\u0430\u043B\u044E\u0442\u0435: ".concat(formatterUSD.format(security.VOLTODAY));
    var mes = pair + "\n" + current + "\n" + delta + "\n" + ruVal + "\n" + usdVal;
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

  if (msg.text == "/start") {
    bot.sendMessage(telegramID, "Отслеживаю USD/RUB...");
    var replyMarkup = JSON.stringify({
      inline_keyboard: [[{
        text: "Test button"
      }]]
    });
    bot.sendMessage(telegramID, "Вы хотите отменить?", {
      reply_markup: JSON.stringify({
        keyboard: [[{
          text: "Да отмена",
          callback_data: "147"
        }], [{
          text: "Нет, не надо",
          callback_data: "146"
        }]]
      })
    });
    job.start();
    greeting(telegramID, "".concat(msg.from.first_name, " ").concat(msg.from.last_name));
    currentTime(telegramID);
  } else if (msg.text == "/stop") {
    bot.sendMessage(telegramID, "Больше не отслеживаю USD/RUB!");
    job.stop();
  }
});

var greeting = function greeting(chatID, name) {
  bot.sendMessage(chatID, "DiomedialC \u043F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432\u0430\u0441, ".concat(name));
};

var currentTime = function currentTime(chatID) {
  bot.sendMessage(chatID, new Date().toString());
}; //const s = "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off"
//"https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off&iss.only=boards&boards.columns=secid,is_primary,boardid"
//", "//document//data//rows//row[@is_primary=1]/@boardid")
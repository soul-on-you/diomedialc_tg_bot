import MoexAPI from "moex-api";
import { formatterRUB, formatterUSD } from "./formaters.js";

const moexApi = new MoexAPI();

// const MoexUsdRub = () => {
//   moexApi
//     .securityMarketData("USD000UTSTOM")
//     .then((security) => {
//       // const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
//       const pair = `Пара ${security.securityInfo.SECNAME.split(" ")[2]}`;
//       const current = `Текущая цена ${formatterRUB.format(security.node.last)}`;
//       const delta = `Изменение курса ${
//         security.CHANGE > 0 ? "+" : ""
//       }${formatterRUB.format(security.CHANGE)}`;
//       const ruVal = `Объем в рублях: ${formatterRUB.format(
//         security.VALTODAY_RUR
//       )}`;
//       const usdVal = `Объем в валюте: ${formatterUSD.format(
//         security.VOLTODAY
//       )}`;
//       const mes =
//         pair + "\n" + current + "\n" + delta + "\n" + ruVal + "\n" + usdVal;
//       console.log(mes);
//       bot.sendMessage(telegramID, mes);
//     })
//     .catch((security) => {
//       console.log(security);
//       console.log("Error!");
//     });
// };

// "USD000UTSTOM"

const MoexCurrency = (currencyAPI) => {
  moexApi
    .securityMarketData(currencyAPI)
    .then((currency) => {
      const pair = `Пара ${currency.securityInfo.SECNAME.split(" ")[2]}`;
      const current = `Текущая цена ${formatterRUB.format(currency.node.last)}`;
      const delta = `Изменение курса ${
        currency.CHANGE > 0 ? "+" : ""
      }${formatterRUB.format(currency.CHANGE)}`;
      return `${pair}\n${current}\n${delta}\n`;
      // bot.sendMessage(telegramID, mes);
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

const MoexSecurities = (securitiesAPI) => {
  moexApi
    .securityMarketData(securitiesAPI)
    .then((security) => {
      // const pair = `Пара ${security.securityInfo.SECNAME.split(" ")[2]}`;
      // const current = `Текущая цена ${formatterRUB.format(security.node.last)}`;
      // const delta = `Изменение курса ${
      //   security.CHANGE > 0 ? "+" : ""
      // }${formatterRUB.format(security.CHANGE)}`;
      return `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

export { MoexCurrency, MoexSecurities };

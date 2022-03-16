import MoexAPI from "moex-api";
import Formatters from "./formaters.js";

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

// usd(Доллар США)
// rub(Рубль России)
// eur(Евро)
// cny(Китайский Юань)
// byn(Белорусский рубль)
// hkd(Гонконгский доллар)
// gbp(Фунт стерлингов)
// try(Турецкая лира)
// chf(Швейцарский франк)
// jpy(Японская ена)
// kzt(Казахские тенге)
//"USD000UTSTOM"

const MoexCurrency = async (currencyAPI, currencyName, currencyData) => {
  await moexApi
    .securityMarketData(currencyAPI)
    .then((currency) => {
      // const pair = `Пара ${currency.securityInfo.SECNAME.split(" ")[2]}`;
      // const current = `Текущая цена ${Formatters.pair.split("/")[1].format(currency.node.last)}`;
      // const delta = `Изменение курса ${
      //   currency.CHANGE > 0 ? "+" : ""
      // }${Formatters.pair.split(":")[1].format(currency.CHANGE)}`;
      // return `${pair}\n${current}\n${delta}\n`;
      // bot.sendMessage(telegramID, mes);
      // console.log(currency);
      const pair = currency.securityInfo.SECNAME.split(" ")[2];
      // pairS = pair
      // console.log(pair);
      // console.log(pair.split("/")[1]);
      const formatter = Formatters[pair.split("/")[1]];
      // console.log(pair);
      // console.log(formatter);
      // const current = formatter.format(currency.node.last);
      const ans = `Пара ${pair}\nТекущая цена ${formatter.format(
        currency.node.last
      )}\nИзменение курса ${
        currency.CHANGE > 0 ? "📈 +" : "📉 "
      }${formatter.format(currency.CHANGE)}`;
      // console.log(ans);
      currencyData[currencyName] = ans;
      // console.log(currencyData);
      // return ans;
    })
    .catch((error) => {
      console.error(error);
      // return error;
    });
};

const MoexSecurities = async (securitiesAPI) => {
  await moexApi
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

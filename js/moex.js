// import MoexAPI from "moex-api";
const MoexAPI = require("moex-api");

const moexApi = new MoexAPI();

// moexApi.securityMarketData("USD000UTSTOM").then((security) => {
//   console.log(security.node.last); // e.g. 64.04
//   console.log(security);
// });
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

moexApi.securityMarketData("USD000UTSTOM").then((security) => {
  //   await console.log("security node: ");
  // const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
  // console.log(mes);
  console.log(security);
  // console.log(security.securityInfo.SECNAME.split(" ")[2]);
  const pair = `Пара ${security.securityInfo.SECNAME.split(" ")[2]}`;
  const current = `Текущая цена ${formatterRUB.format(security.node.last)}`;
  const delta = `Изменение курса ${
    security.CHANGE > 0 ? "+" : ""
  }${formatterRUB.format(security.CHANGE)}`;
  const ruVal = `Объем в рублях: ${formatterRUB.format(security.VALTODAY_RUR)}`;
  const usdVal = `Объем в валюте: ${formatterUSD.format(security.VOLTODAY)}`;

  console.log(pair);
  console.log(current);
  console.log(delta);
  console.log(ruVal);
  console.log(usdVal);
});

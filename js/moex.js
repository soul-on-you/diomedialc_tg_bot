import MoexAPI from "moex-api";

const moexApi = new MoexAPI();

// moexApi.securityMarketData("USD000UTSTOM").then((security) => {
//   console.log(security.node.last); // e.g. 64.04
//   console.log(security);
// });

moexApi.securityMarketData("SBER").then((security) => {
  //   await console.log("security node: ");
  const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
  console.log(mes);
});

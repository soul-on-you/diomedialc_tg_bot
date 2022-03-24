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


moexApi.securityMarketData("PHOR").then((security) => {
  //   await console.log("security node: ");
  // const mes = `Компания ${security.securityInfo.SECNAME}\nАкции ${security.securityInfo.SHORTNAME}\nТикер ${security.SECID}\nЦена ${security.securityInfo.PREVWAPRICE}\nСтатус торгов ${security.TRADINGSTATUS}\nОбъем торгов ${security.VOLTODAY}`;
  // console.log(mes);
  console.log(security);
  // console.log(security.securityInfo.SECNAME.split(" ")[2]);
  const pair = `Акции ${security.node.friendlyTitle} [${security.SECID}]`;
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

/**
 * {
  SECID: 'LKOH',
  BOARDID: 'TQBR',
  BID: 5708.5,
  BIDDEPTH: null,
  OFFER: 5709.5,
  OFFERDEPTH: null,
  SPREAD: 1,
  BIDDEPTHT: 167100,
  OFFERDEPTHT: 48689,
  OPEN: 5302.5,
  LOW: 5300,
  HIGH: 5993,
  LAST: 5708.5,
  LASTCHANGE: -1,
  LASTCHANGEPRCNT: -0.02,
  QTY: 3,
  VALUE: 17125.5,
  VALUE_USD: 166.01,
  WAPRICE: 5656.5,
  LASTCNGTOLASTWAPRICE: 708,
  WAPTOPREVWAPRICEPRCNT: 13.12,
  WAPTOPREVWAPRICE: 656,
  CLOSEPRICE: null,
  MARKETPRICETODAY: null,
  MARKETPRICE: 5153.5,
  LASTTOPREVPRICE: 16.14,
  NUMTRADES: 39285,
  VOLTODAY: 444267,
  VALTODAY: 2512962059,
  VALTODAY_USD: 24359424,
  ETFSETTLEPRICE: null,
  TRADINGSTATUS: 'T',
  UPDATETIME: '10:49:35',
  ADMITTEDQUOTE: null,
  LASTBID: null,
  LASTOFFER: null,
  LCLOSEPRICE: null,
  LCURRENTPRICE: 5674,
  MARKETPRICE2: null,
  NUMBIDS: null,
  NUMOFFERS: null,
  CHANGE: 793.5,
  TIME: '10:49:35',
  HIGHBID: null,
  LOWOFFER: null,
  PRICEMINUSPREVWAPRICE: 708,
  OPENPERIODPRICE: 5302.5,
  SEQNUM: 652161,
  SYSTIME: '2022-03-24 11:04:35',
  CLOSINGAUCTIONPRICE: null,
  CLOSINGAUCTIONVOLUME: null,
  ISSUECAPITALIZATION: 3954184903734,
  ISSUECAPITALIZATION_UPDATETIME: '11:02:59',
  ETFSETTLECURRENCY: null,
  VALTODAY_RUR: 2512962059,
  TRADINGSESSION: '1',
  securityInfo: {
    SECID: 'LKOH',
    BOARDID: 'TQBR',
    SHORTNAME: 'ЛУКОЙЛ',
    PREVPRICE: 4915,
    LOTSIZE: 1,
    FACEVALUE: 0.025,
    STATUS: 'A',
    BOARDNAME: 'Т+: Акции и ДР - безадрес.',
    DECIMALS: 1,
    SECNAME: 'НК ЛУКОЙЛ (ПАО) - ао',
    REMARKS: null,
    MARKETCODE: 'FNDT',
    INSTRID: 'EQIN',
    SECTORID: null,
    MINSTEP: 0.5,
    PREVWAPRICE: 5000.5,
    FACEUNIT: 'SUR',
    PREVDATE: '2022-03-23',
    ISSUESIZE: 692865762,
    ISIN: 'RU0009024277',
    LATNAME: 'LUKOIL',
    REGNUMBER: '1-01-00077-A',
    PREVLEGALCLOSEPRICE: 4921,
    PREVADMITTEDQUOTE: 4921,
    CURRENCYID: 'SUR',
    SECTYPE: '1',
    LISTLEVEL: 1,
    SETTLEDATE: '2022-03-28'
  },
  node: {
    last: 5708.5,
    volume: 2512962059,
    friendlyTitle: 'ЛУКОЙЛ',
    id: 'LKOH'
  }
}
Пара (ПАО)
Текущая цена 5 708,50 ₽
Изменение курса +793,50 ₽
Объем в рублях: 2 512 962 059,00 ₽
Объем в валюте: $444,267.00
 */
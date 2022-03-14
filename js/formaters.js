const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterRUB = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterEUR = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterCNY = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterBYN = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "BYN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterHKD = new Intl.NumberFormat("zh-HK", {
  style: "currency",
  currency: "HKD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterTRY = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterCHF = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterJPY = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterKZT = new Intl.NumberFormat("kk-KZ", {
  style: "currency",
  currency: "KZT",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export {
  formatterRUB,
  formatterUSD,
  formatterEUR,
  formatterCNY,
  formatterBYN,
  formatterHKD,
  formatterGBP,
  formatterTRY,
  formatterCHF,
  formatterJPY,
  formatterKZT,
};

export default {
  RUB: formatterRUB,
  USD: formatterUSD,
  EUR: formatterEUR,
  CNY: formatterCNY,
  BYN: formatterBYN,
  HKD: formatterHKD,
  GBP: formatterGBP,
  TRY: formatterTRY,
  CHF: formatterCHF,
  JPY: formatterJPY,
  KZT: formatterKZT,
};
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

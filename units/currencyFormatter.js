import Formatters from "./../js/formaters";

function getIntlNumberFormatWithNarrowCurrency(currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    });
  } catch (e) {
    if (e.constructor !== RangeError) {
      throw e;
    }
    return null;
  }
}

const formatter = getIntlNumberFormatWithNarrowCurrency("TRY");
const formatter2 = getIntlNumberFormatWithNarrowCurrency("USD");
console.log(formatter.format("100.0"));
console.log(formatter2.format("100.0"), "\n");
console.log(Formatters);
for (const formater in Formatters) {
  console.log(Formatters[formater].format("100.0")); //.format("100.0")
}

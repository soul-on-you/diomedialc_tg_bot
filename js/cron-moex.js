import { CronTask } from "./cron_task";
import { MoexCurrency } from "./moex";
import sequelize from "./db_connection";
import { Сurrencies as CurrencyModel } from "./db_models";

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error("Подключение к БД не выполнилось!\n", e);
  }

  const currenciesInfo = (await CurrencyModel.findAll()).map((currency) => {
    return { name: currency.currencyName, API: currency.currencyAPI };
  });

  console.log(currenciesInfo);

  const currencyData = {};
  console.log("CURRENCY\n", currencyData);
  const moexCurrencyTask = async (currenciesInfo, currencyData) =>
    await currenciesInfo.map(async (currency) =>
      MoexCurrency(currency.API, currency.name, currencyData)
    );

  const consoleOutTask = async (currencyData) => {
    console.log("CURRENCY\n", currencyData);
    // for (const currency in currencyData) {
    //   console.log(`${currencyData[currency
    // }
  };

  CronTask(moexCurrencyTask, 10, 19, currenciesInfo, currencyData).start();
  CronTask(consoleOutTask, 10, 19, currencyData).start();
};

// start();

const MoexCurrencyUpdateTask = async (
  currencyDBInfo,
  currencyLocalData,
  from,
  to
) => {
  const MoexCurrencyTask = async (currencyInfo, currencyData) =>
    await currencyInfo.map(
      async (currency) =>
        await MoexCurrency(currency.API, currency.name, currencyData)
    );

  return CronTask(
    MoexCurrencyTask,
    from,
    to,
    currencyDBInfo,
    currencyLocalData
  );
};

export { MoexCurrencyUpdateTask };
// const start2 = async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//   } catch (e) {
//     console.error("Подключение к БД не выполнилось!\n", e);
//   }

//   const currenciesInfo = (await CurrencyModel.findAll()).map((currency) => {
//     return { name: currency.currencyName, API: currency.currencyAPI };
//   });

//   console.log(currenciesInfo);

//   const currencyData = {};
//   console.log("CURRENCY\n", currencyData);
//   const moexCurrencyTask = async (currenciesInfo, currencyData) => {
//     return MoexCurrency(currenciesInfo.API, currenciesInfo.name, currencyData);
//   };

//   const TaskMoexCurrencyUSDRUB = moexCurrencyTask(
//     currenciesInfo[1],
//     currencyData
//   );
//   const MoexCurrencyTasks = () => {
//     CronTask(TaskMoexCurrencyUSDRUB, 9, 23).start();
//   };

//   MoexCurrencyTasks();
// };

import { CronJob as Cron } from "cron";

export const CronTask = (task, startTime, EndTime, ...args) => {
  return new Cron(
    `0,5,10,15,20,25,30,35,40,45,50,55 * ${startTime}-${EndTime-1} * * *`,
    () => {
      task(...args);
    }
  );
};
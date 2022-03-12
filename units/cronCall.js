import { CronTask } from "./cron";

console.log(new Date().toString());
const task = ([a, b]) =>
  console.log(`arg[1] = ${a}, arg[2] = ${b}, DATE = ${new Date().toString()}`);
const start = 34,
  end = 37;
CronTask(task, start, end, ["kravl", 665]).start();

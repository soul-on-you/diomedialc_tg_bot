// var CronJob = require('cron').CronJob;
// var job = new CronJob(
// 	'* * * * * *',
// 	function() {
// 		console.log('You will see this message every second');
// 	},
// 	null,
// 	true,
// 	'America/Los_Angeles'
// );

import { CronJob as Cron } from "cron";

new Cron("* * * * * *", () => {
  console.log("You will see this message every second");
});

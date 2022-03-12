import { Sequelize } from "sequelize";
export default new Sequelize("TelegramMoexBot", "ash", "rable1553", {
  host: "localhost",
  port: 3306,
  dialect: "mariadb",
});
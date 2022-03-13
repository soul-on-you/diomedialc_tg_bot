import sequelize from "./db_connection";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  chatID: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  rules: {
    type: DataTypes.ENUM,
    values: ["USER", "MODERATOR", "ADMIN"],
    allowNull: false,
    defaultValue: "USER",
  },
});

export const UserСurrencies = sequelize.define("UserСurrencies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  chatID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: "Users",
      key: "chatID",
    },
  },
  currencyID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: "Сurrencies",
      key: "id",
    },
  },
});

export const Сurrencies = sequelize.define("Сurrencies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  currencyName: {
    type: DataTypes.STRING(7),
    allowNull: false,
    unique: true,
  },
  currencyAPI: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

// export const Сurrencies = sequelize.define("Сurrencies", {
//   currency: {
//     type: DataTypes.STRING(3),
//
//   },
//   currencyAPIKey: {
//     type: DataTypes.STRING(20),
//
//   },
// });

// const User = Sequelize.define("user", {

// });
// const Company = Sequelize.define("company", {

// });

// Company.hasMany(User, { foreignKey: "some_field" });
// User.belongsTo(Company, { foreignKey: "some_field" });
// export default (sequelize, DataTypes) => {
//   return sequelize.define("user", {
//     some_field: {
//       type: DataTypes.INTEGER,
//       required: true,
//       references: {
//         model: "company",
//         key: "some_field",
//       },
//     },
//   });
// };

// const users_panel = sequelize.define('users_panel', {
//     email:  {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     }
// })
// const ads = sequelize.define('ads', {
//     user_panel_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

// })
// usersPanel.hasMany(ads, {foreignKey: 'user_panel_id', as: 'ads'});
// ads.belongsTo(usersPanel, {foreignKey: 'id', as: 'user'});

// sequelize.sync({force: false})
// .then(data => console.log('ok'))
// .catch(error => console.error(error))

// const users_panel = sequelize.define('users_panel', {
//     email:  {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     }
// })

// const ads = sequelize.define('ads', {
//     user_panel_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

// })
// usersPanel.hasMany(ads, {foreignKey: 'user_panel_id', as: 'ads'});
// ads.belongsTo(usersPanel, {foreignKey: 'id', as: 'user'});

// sequelize.sync({force: false})
// .then(data => console.log('ok'))
// .catch(error => console.error(error))

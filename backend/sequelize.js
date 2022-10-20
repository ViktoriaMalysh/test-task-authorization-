const { Sequelize, Model, DataTypes } = require("sequelize");
const database = process.env.database;
const username = process.env.username;
const password = process.env.password;

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
);

module.exports = {
  User: User,
};

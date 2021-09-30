import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
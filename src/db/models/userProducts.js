import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const UserProduct = sequelize.define("userProduct", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});


export default UserProduct
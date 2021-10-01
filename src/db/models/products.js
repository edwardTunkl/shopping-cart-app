import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define(
  "product",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: "http://lorempixel.com/400/200/",
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Product

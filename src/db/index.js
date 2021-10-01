import { Sequelize } from "sequelize"

const { PGPORT, PGHOST, PGPASSWORD, PGUSER, PGDDATABASE } = process.env;

const sequelize = new Sequelize(PGDDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
});

const testDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("DataBase authenticated! Good Job!!!");
  } catch (error) {
    console.log(error);
  }
};

//testDataBase();

export const connectDataBase = async () => {
  try {
    await sequelize.sync();
    console.log("-----DB connected-----");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
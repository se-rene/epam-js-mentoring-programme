import { Dialect, Sequelize } from "sequelize";
import logger from "../logger";

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

const sequelize = new Sequelize(
	DB_NAME as string,
	DB_USERNAME as string,
	DB_PASSWORD,
	{
		host: "localhost",
		dialect: DB_DIALECT as Dialect,
	}
);

export async function init() {
	try {
		await sequelize.authenticate();
		logger.info("Connection has been established successfully.");
		await sequelize.sync();
		logger.info("All models were synchronized successfully.");
	} catch (error) {
		logger.error("Unable to connect to the database: ", error);
	}
}

export default sequelize;

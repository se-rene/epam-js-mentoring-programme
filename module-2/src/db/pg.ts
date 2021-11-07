import { Dialect, Sequelize } from "sequelize";

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
		console.log("Connection has been established successfully.");
		await sequelize.sync();
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

export default sequelize;

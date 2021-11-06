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

(async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

export default sequelize;

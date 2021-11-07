import sequelize from "../db/pg";
import { DataTypes, Model } from "sequelize";

class UserDAO extends Model {}
UserDAO.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		isDeleted: {
			defaultValue: false,
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		sequelize, // We need to pass the connection instance
		modelName: "User", // We need to choose the model name
		timestamps: true,
	}
);

export default UserDAO;

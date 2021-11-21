import sequelize from "../db/pg";
import { DataTypes } from "sequelize";
import GroupDAO from "./GroupDAO";

const UserDAO = sequelize.define(
	"user",
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
		timestamps: true,
	}
);

UserDAO.belongsToMany(GroupDAO, { through: "users_groups" });
GroupDAO.belongsToMany(UserDAO, { through: "users_groups" });

export default UserDAO;

import sequelize from "../db/pg";
import { DataTypes, Model } from "sequelize";

class GroupDAO extends Model {}
GroupDAO.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		permissions: {
			type: DataTypes.ARRAY(
				DataTypes.ENUM("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")
			),
			allowNull: false,
		},
	},
	{
		// Other model options go here
		sequelize, // We need to pass the connection instance
		modelName: "Group", // We need to choose the model name
		timestamps: true,
	}
);

export default GroupDAO;

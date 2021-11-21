import sequelize from "../db/pg";
import { DataTypes } from "sequelize";

const GroupDAO = sequelize.define(
	"group",
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
			defaultValue: [],
		},
	},
	{
		// Other model options go here
		timestamps: true,
	}
);

export default GroupDAO;

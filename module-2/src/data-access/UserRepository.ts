import UserDAO from "../models/UserDAO";
import { User } from "../types/User";

export async function selectUser(id: string) {
	return UserDAO.findOne({
		where: {
			id,
		},
	});
}

export async function insertUser(userDTO: User) {
	const newUser = await UserDAO.create({
		login: userDTO.login,
		password: userDTO.password,
		age: userDTO.age,
	});

	return newUser;
}

export async function saveUser(userDTO: User) {
	const user = await UserDAO.update(
		{
			login: userDTO.login,
			password: userDTO.password,
			age: userDTO.age,
		},
		{ where: { id: userDTO.id } }
	);
}

export async function softDeleteUser(id: string) {
	const user = await UserDAO.build({ id });

	user.set({
		isDeleted: true,
	});

	await user.save();
}

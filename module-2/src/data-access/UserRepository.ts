import UserDAO from "../models/UserDAO";
import { User } from "../types/User";

export async function findAll() {
	return UserDAO.findAll();
}

export function findUser(id: string) {
	return UserDAO.findByPk(id);
}

export async function insertUser(userDTO: User) {
	const newUser = await UserDAO.create({
		login: userDTO.login,
		password: userDTO.password,
		age: userDTO.age,
	});

	return newUser;
}

export function saveUser(userDTO: User) {
	return UserDAO.update(
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

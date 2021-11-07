import { User } from "../types/User";
import {
	insertUser,
	selectUser,
	saveUser,
	softDeleteUser,
} from "../data-access/UserRepository";

export function createUser(user: User) {
	return insertUser(user);
}

export function updateUser(user: User) {
	saveUser(user);
}

export function deleteUser(id: string) {
	softDeleteUser(id);
}

export async function getUser(id: string) {
	return await selectUser(id);
}

import { User } from "../types/User";
import {
	findAll,
	insertUser,
	findUser,
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

export function getUser(id: string) {
	return findUser(id);
}

export function getUsers() {
	return findAll();
}

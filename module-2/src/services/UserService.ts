import { v4 as uuidv4 } from "uuid";
import db from "../db";
import { User } from "../types/User";

export function createUser(user: User) {
	user.id = uuidv4();
	user.isDeleted = false;

	db.insert(user);
}

export function updateUser(user: User) {
	db.update(user);
}

export function deleteUser(id: string) {
	db.remove(id);
}

export function getUser(id: string): User | null {
	return db.find(id);
}

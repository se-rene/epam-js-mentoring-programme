import { User } from "../types/User";

function db() {
	let db: User[] = [];

	function find(id: string) {
		return db.find((user) => user.id === id);
	}

	function findAll() {
		return db;
	}

	function insert(user: User) {
		db.push(user);
	}

	function update(updatedUser: User) {
		const index = db.findIndex((user) => user.id === updatedUser.id);
		db.splice(index, 1, updatedUser);
	}

	function remove(id: string) {
		let user: User = find(id) as User;
		user.isDeleted = true;
	}

	return { find, findAll, insert, update, remove };
}

export default db();

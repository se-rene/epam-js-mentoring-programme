import sequelize from "../db/pg";
import GroupDAO from "../models/GroupDAO";
import UserDAO from "../models/UserDAO";
import { Group } from "../types/Group";

export function findAll() {
	return GroupDAO.findAll({ include: UserDAO });
}

export function findGroup(id: string) {
	return GroupDAO.findByPk(id, { include: UserDAO });
}

export async function insertGroup(groupDTO: Group) {
	const newGroup = await GroupDAO.create({
		name: groupDTO.name,
		permissions: groupDTO.permissions,
	});

	return newGroup;
}

export async function saveGroup(groupDTO: Group) {
	const group = await GroupDAO.update(
		{
			id: groupDTO.id,
			name: groupDTO.name,
			permissions: groupDTO.permissions,
		},
		{ where: { id: groupDTO.id } }
	);
}

export async function removeGroup(id: string) {
	const group = await GroupDAO.build({ id });
	await group.destroy();
}

export async function insertUsersToGroup(groupId: string, userIds: string[]) {
	try {
		const group = await findGroup(groupId);
		// @ts-ignore
		group.addUsers(userIds);
	} catch (error) {
		throw error;
	}
}

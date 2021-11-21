import GroupDAO from "../models/GroupDAO";
import { Group } from "../types/Group";

export async function selectGroup(id: string) {
	return GroupDAO.findOne({
		where: {
			id,
		},
	});
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

import { Group } from "../types/Group";
import {
	findAll,
	insertGroup,
	findGroup,
	saveGroup,
	removeGroup,
} from "../data-access/GroupRepository";

export function getGroups() {
	return findAll();
}

export function createGroup(user: Group) {
	return insertGroup(user);
}

export function updateGroup(user: Group) {
	saveGroup(user);
}

export function deleteGroup(id: string) {
	removeGroup(id);
}

export function getGroup(id: string) {
	return findGroup(id);
}

import { Group } from "../types/Group";
import {
	insertGroup,
	selectGroup,
	saveGroup,
	removeGroup,
} from "../data-access/GroupRepository";

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
	return selectGroup(id);
}

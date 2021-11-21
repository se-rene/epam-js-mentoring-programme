import { insertUsersToGroup } from "../data-access/GroupRepository";

function addUsersToGroup(groupId: string, userIds: string[]) {
	insertUsersToGroup(groupId, userIds);
}

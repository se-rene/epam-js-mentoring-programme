import { getUserByLoginPassword } from "./UserService";
import UserNotFoundError from "../constants/errors/UserNotFoundError";
import { generateJWT } from "../utils/authUtils";

export async function getAuthToken(login: string, password: string) {
	if (!(await getUserByLoginPassword(login, password))) {
		throw new UserNotFoundError();
	}

	return {
		token: generateJWT(login),
	};
}

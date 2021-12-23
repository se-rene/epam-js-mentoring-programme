import GenericError from "./GenericError";

export default class UserNotFoundError extends GenericError {
	statusCode: number;

	constructor() {
		super();
		this.message = "User not found";
		this.statusCode = 404;
	}
}

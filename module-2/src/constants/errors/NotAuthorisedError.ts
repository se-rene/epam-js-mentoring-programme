import GenericError from "./GenericError";

export default class NotAuthorisedError extends GenericError {
	statusCode: number;

	constructor(messsage: string) {
		super();
		this.message = messsage || "Request not authorised";
		this.statusCode = 401;
	}
}

export default class GenericError extends Error {
	statusCode: number;

	constructor() {
		super();
		this.statusCode = 500;
	}
}

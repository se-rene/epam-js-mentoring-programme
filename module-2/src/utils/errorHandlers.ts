import { NextFunction, Request, Response } from "express";
import logger from "../logger";

// it is not safe to resume normal operation after 'uncaughtException',
// because the system becomes corrupted:
//    The correct use of 'uncaughtException' is to perform synchronous cleanup of
//    allocated resources (e.g. file descriptors, handles, etc) before shutting down the process.
export function handleUncaughtException(err: Error) {
	logger.error("Uncaught exception: %s", err.stack);
	process.exit(1);
}

export function handleUnhandledException(err: Error, p: Promise<any>) {
	logger.error("Unhandled exception: %s; Promise: %s", err || "", p);
}

export function handleError(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	logger.error({
		method: req.method,
		args: {
			params: req.params,
			body: req.body,
		},
		url: req.url,
		error: err.stack,
	});
	res.status(500).send("Oops, an unexpected error occurred.");
}

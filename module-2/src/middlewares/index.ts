import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { isJWTValid } from "../utils/authUtils";
import NotAuthorisedError from "../constants/errors/NotAuthorisedError";

import logger from "../logger";

export function validateSchema(schema: Schema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (err) {
			res.status(400).send((err as Error).message);
		}
	};
}

export function validateAuth(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;
	if (
		!authToken ||
		!authToken.startsWith("Bearer ") ||
		!isJWTValid(authToken.substring(7))
	) {
		throw new NotAuthorisedError("Auth token invalid / not provided.");
	}

	next();
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
	logger.info({
		method: req.method,
		args: {
			params: req.params,
			body: req.body,
		},
		url: req.url,
	});

	next();
}

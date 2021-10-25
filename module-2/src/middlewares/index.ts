import { NextFunction, Request, Response } from "express";
import { Err, Schema } from "joi";

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

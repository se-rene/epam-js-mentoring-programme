import { v4 as uuidv4 } from "uuid";
import { Request, Response, Router } from "express";
import { User } from "../types/User";
import { validateSchema } from "../middlewares";
import { addUserSchema, updateUserSchema } from "../validation/UserSchema";
import db from "../db";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
	const { limit = 10, loginSubstring = "" } = req.query;
	res.status(200).send(db.findAll(Number(limit), loginSubstring.toString()));
});

router.post(
	"/users",
	validateSchema(addUserSchema),
	(req: Request, res: Response) => {
		const user: User = req.body;
		user.id = uuidv4();
		user.isDeleted = false;

		db.insert(user);
		res.status(201).send();
	}
);

router.put(
	"/users",
	validateSchema(updateUserSchema),
	(req: Request, res: Response) => {
		const user: User = req.body;
		db.update(user);
		res.status(200).send();
	}
);

router
	.route("/users/:id")
	.get((req: Request, res: Response) => {
		const { id } = req.params;
		res.status(200).send(db.find(id));
	})
	.delete((req: Request, res: Response) => {
		const { id } = req.params;
		db.remove(id);
		res.status(200);
	});

export default router;

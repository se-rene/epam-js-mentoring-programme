import { Request, Response, Router } from "express";
import db from "../db";
import { validateSchema } from "../middlewares";
import {
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../services/UserService";
import { addUserSchema, updateUserSchema } from "../validation/UserSchema";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
	const { limit = 10, loginSubstring = "" } = req.query;
	res.status(200).send(db.findAll(Number(limit), loginSubstring.toString()));
});

router.post(
	"/users",
	validateSchema(addUserSchema),
	async (req: Request, res: Response) => {
		const newUser = await createUser(req.body);
		res.status(201).send(newUser);
	}
);

router.put(
	"/users",
	validateSchema(updateUserSchema),
	(req: Request, res: Response) => {
		updateUser(req.body);
		res.status(200).send();
	}
);

router
	.route("/users/:id")
	.get((req: Request, res: Response) => {
		const { id } = req.params;
		res.status(200).send(getUser(id));
	})
	.delete((req: Request, res: Response) => {
		const { id } = req.params;
		deleteUser(id);
		res.status(200);
	});

export default router;

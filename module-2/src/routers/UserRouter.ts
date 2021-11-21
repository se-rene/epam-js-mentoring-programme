import { Request, Response, Router } from "express";
import { validateSchema } from "../middlewares";
import {
	getUsers,
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../services/UserService";
import { addUserSchema, updateUserSchema } from "../validation/UserSchema";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
	res.status(200).send(await getUsers());
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
	async (req: Request, res: Response) => {
		await updateUser(req.body);
		res.status(200).send();
	}
);

router
	.route("/users/:id")
	.get(async (req: Request, res: Response) => {
		const { id } = req.params;
		res.status(200).send(await getUser(id));
	})
	.delete(async (req: Request, res: Response) => {
		const { id } = req.params;
		await deleteUser(id);
		res.status(200).send();
	});

export default router;

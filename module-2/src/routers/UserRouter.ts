import { Request, Response, Router } from "express";
import { validateAuth, validateSchema } from "../middlewares";
import {
	getUsers,
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../services/UserService";
import { addUserSchema, updateUserSchema } from "../validation/UserSchema";

const router = Router();
router.use(validateAuth);

router.get("/", async (req: Request, res: Response) => {
	res.status(200).send(await getUsers());
});

router.post(
	"/",
	validateSchema(addUserSchema),
	async (req: Request, res: Response) => {
		await createUser(req.body);
		res.status(201).send();
	}
);

router.put(
	"/",
	validateSchema(updateUserSchema),
	async (req: Request, res: Response) => {
		await updateUser(req.body);
		res.status(200).send();
	}
);

router
	.route("/:id")
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

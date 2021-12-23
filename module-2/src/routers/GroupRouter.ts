import { Request, Response, Router } from "express";
import { validateAuth, validateSchema } from "../middlewares";
import {
	getGroups,
	createGroup,
	deleteGroup,
	getGroup,
	updateGroup,
} from "../services/GroupService";
import { addGroupSchema, updateGroupSchema } from "../validation/GroupSchema";

const router = Router();
router.use(validateAuth);

router.get("/", async (req: Request, res: Response) => {
	res.status(200).send(await getGroups());
});

router.post(
	"/",
	validateSchema(addGroupSchema),
	async (req: Request, res: Response) => {
		const newGroup = await createGroup(req.body);
		res.status(201).send(newGroup);
	}
);

router.put(
	"/",
	validateSchema(updateGroupSchema),
	(req: Request, res: Response) => {
		updateGroup(req.body);
		res.status(200).send();
	}
);

router
	.route("/:id")
	.get(async (req: Request, res: Response) => {
		const { id } = req.params;
		res.status(200).send(await getGroup(id));
	})
	.delete(async (req: Request, res: Response) => {
		const { id } = req.params;
		await deleteGroup(id);
		res.status(200).send();
	});

export default router;

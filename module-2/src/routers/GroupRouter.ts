import { Request, Response, Router } from "express";
import { validateSchema } from "../middlewares";
import {
	getGroups,
	createGroup,
	deleteGroup,
	getGroup,
	updateGroup,
} from "../services/GroupService";
import { addGroupSchema, updateGroupSchema } from "../validation/GroupSchema";

const router = Router();

router.get("/groups", async (req: Request, res: Response) => {
	res.status(200).send(await getGroups());
});

router.post(
	"/groups",
	validateSchema(addGroupSchema),
	async (req: Request, res: Response) => {
		const newGroup = await createGroup(req.body);
		res.status(201).send(newGroup);
	}
);

router.put(
	"/groups",
	validateSchema(updateGroupSchema),
	(req: Request, res: Response) => {
		updateGroup(req.body);
		res.status(200).send();
	}
);

router
	.route("/groups/:id")
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

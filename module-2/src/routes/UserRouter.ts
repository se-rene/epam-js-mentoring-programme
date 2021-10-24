import { v4 as uuidv4 } from "uuid";
import { Request, Response, Router } from "express";
import db from "../db";
import { User } from "../types/User";

const router = Router();

router
	.route("/users")
	.get((req: Request, res: Response) => {
		res.status(200).send(db.findAll());
	})
	.post((req: Request, res: Response) => {
		const user: User = req.body;
		user.id = uuidv4();

		db.insert(user);
		res.status(201).send();
	})
	.put((req: Request, res: Response) => {
		const user: User = req.body;
		db.update(user);
		res.status(200).send();
	});

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

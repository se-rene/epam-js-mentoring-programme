import { Request, Response, Router } from "express";
import { handleAsync } from "../utils/errorUtils";
import { validateSchema } from "../middlewares";
import { getAuthToken } from "../services/AuthService";
import { loginSchema } from "../validation/LoginSchema";

const router = Router();

router.post(
	"/login",
	validateSchema(loginSchema),
	handleAsync(async (req: Request, res: Response) => {
		const { username, password } = req.body;
		res.send(await getAuthToken(username, password));
	})
);

export default router;

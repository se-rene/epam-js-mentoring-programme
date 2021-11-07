import express from "express";
import UserRouter from "./src/routers/UserRouter";
import { init } from "./src/db/pg";

const app = express();
const port = 3000;

app.use(express.json());
app.use(UserRouter);

app.listen(port, async () => {
	console.log("Establishing database connection...");
	await init();

	console.log(`Listening to port ${port}`);
});

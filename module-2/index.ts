import express, { NextFunction, Request, Response } from "express";
import { init } from "./src/db/pg";
import logger from "./src/logger";
import { requestLogger } from "./src/middlewares";
import GroupRouter from "./src/routers/GroupRouter";
import UserRouter from "./src/routers/UserRouter";
import {
	handleError,
	handleUncaughtException,
	handleUnhandledException,
} from "./src/utils/errorHandlers";

const app = express();
const port = 3000;

app.use(express.json());
app.use(requestLogger);
app.use(UserRouter);
app.use(GroupRouter);
app.get("/", function (req, res) {
	throw new Error("BROKEN"); // Express will catch this on its own.
});
app.use(handleError);

process
	.on("uncaughtException", handleUncaughtException)
	.on("unhandledRejection", handleUnhandledException);

app.listen(port, async () => {
	logger.info("Establishing database connection...");
	await init();
	logger.info(`Listening to port ${port}`);
});

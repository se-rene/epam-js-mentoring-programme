import express from "express";
import cors from "cors";
import { init } from "./src/db/pg";
import logger from "./src/logger";
import { requestLogger } from "./src/middlewares";
import GroupRouter from "./src/routers/GroupRouter";
import UserRouter from "./src/routers/UserRouter";
import AuthRouter from "./src/routers/AuthRouter";
import {
	handleError,
	handleUncaughtException,
	handleUnhandledException,
} from "./src/utils/errorUtils";

const app = express();
const port = 3000;

// App middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/users", UserRouter);
app.use("/groups", GroupRouter);
app.use("/auth", AuthRouter);

// Error middleware and handlers
app.use(handleError);

process
	.on("uncaughtException", handleUncaughtException)
	.on("unhandledRejection", handleUnhandledException);

app.listen(port, async () => {
	logger.info("Establishing database connection...");
	await init();
	logger.info(`Listening to port ${port}`);
});

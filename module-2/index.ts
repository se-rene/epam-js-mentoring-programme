import express from "express";
import UserRouter from "./src/routers/UserRouter";

const app = express();
const port = 3000;

app.use(express.json());
app.use(UserRouter);

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});

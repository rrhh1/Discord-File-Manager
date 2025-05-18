import "dotenv/config";
import express, {Express, Request, Response} from "express";
import cors from "cors";
import pingRouter from "./routes/pingRouter";
import uploadRouter from "./routes/filesRouter";
import getRouter from "./routes/files_get_routes";

const app: Express = express();
const PORT = 8000;
const corsOptions = {
	origin: ["http://localhost:5173"],
};

// ===================== EXPRESS SERVER ===============================
app.use(cors(corsOptions));

app.use("/ping", pingRouter);

app.use("/files", getRouter);
app.use("/files", uploadRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

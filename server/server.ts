import "dotenv/config";
import client from "./src/index";
import express, {Express, Request, Response} from "express";
import cors from "cors";
import pingRouter from "./routes/pingRouter";
import uploadRouter from "./routes/filesRouter";

const app: Express = express();
const PORT = 8000;
const corsOptions = {
	origin: ["http://localhost:5173"],
};

// ===================== EXPRESS SERVER ===============================
app.use(cors(corsOptions));

app.use("/ping", pingRouter);

app.use("/files", uploadRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

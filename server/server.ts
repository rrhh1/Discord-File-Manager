import "dotenv/config";
import express, {Express, Request, Response} from "express";
import cors from "cors";
import postRouter from "./routes/FilesPostRoutes";
import getRouter from "./routes/FilesGetRoutes";
import deleteRouter from "./routes/FilesDeleteRoutes";

const app: Express = express();
const PORT = 8000;
const corsOptions = {
	origin: ["http://localhost:5173"],
};

// ===================== EXPRESS SERVER ===============================
app.use(cors(corsOptions));

// Get routes
app.use("/files", getRouter);

// Post routes
app.use("/files", postRouter);

// Delete routes
app.use("/files", deleteRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

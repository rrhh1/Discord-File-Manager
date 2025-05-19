import express, {Request} from "express";
import {
	paramCreateDiscordFileName,
	paramFileNameIsExist,
	paramIsExist,
} from "../middleware/paramConversion";
import {files_download_controller, files_get_controller} from "../controllers/FilesGetControllers";

const get_router = express.Router();

get_router.use(express.json({limit: "15mb"}));
get_router.use(express.urlencoded({extended: true}));

// Fetch all file names
get_router.get("/get", files_get_controller);

// Download a file
get_router.get(
	"/download/:fileName",
	[paramIsExist, paramFileNameIsExist, paramCreateDiscordFileName],
	files_download_controller
);

export default get_router;

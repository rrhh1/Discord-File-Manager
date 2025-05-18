import express, {Request} from "express";
import {files_download_controller, files_get_controller} from "../controllers/filesController";
import {
	createDiscordFileName,
	paramFileNameIsExist,
	paramIsExist,
} from "../middleware/paramConversion";

const get_router = express.Router();

get_router.use(express.json({limit: "15mb"}));
get_router.use(express.urlencoded({extended: true}));

get_router.get("/get", files_get_controller);

get_router.get(
	"/download/:fileName",
	[paramIsExist, paramFileNameIsExist, createDiscordFileName],
	files_download_controller
);

export default get_router;

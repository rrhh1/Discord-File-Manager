import express from "express";
import {
	bodyFileNameIsExist,
	bodyIsExist,
	bodyCreateDiscordFileName,
} from "../middleware/jsonBodyConversion";
import {files_delete_controller} from "../controllers/FilesDeleteControllers";

const delete_router = express.Router();

delete_router.use(express.json({limit: "15mb"}));
delete_router.use(express.urlencoded({extended: true}));

// Middleware to create a Discord-compatible channel name
delete_router.use(bodyIsExist);
delete_router.use(bodyFileNameIsExist);
delete_router.use(bodyCreateDiscordFileName);

// Delete a file
delete_router.delete("/delete", files_delete_controller);

export default delete_router;

import express from "express";

import {
	bodyDataIsExist,
	bodyFileNameIsExist,
	bodyIndexIsExist,
	bodyIsExist,
	bodyCreateDiscordFileName,
	bodyCreateDiscordSubFileName,
	bodyDecodeBase64ToBuffer,
} from "../middleware/jsonBodyConversion";
import {encryptBodyData} from "../middleware/encrypt-decrypt";
import {
	files_create_controller,
	files_upload_controller,
} from "../controllers/FilesPostControllers";

const post_router = express.Router();

post_router.use(express.json({limit: "15mb"}));
post_router.use(express.urlencoded({extended: true}));

// Middleware to create a Discord-compatible channel name
post_router.use(bodyIsExist);
post_router.use(bodyFileNameIsExist);
post_router.use(bodyCreateDiscordFileName);

// Create a file
post_router.post("/create", files_create_controller);

// ============ Upload ========================
// Middle ware to create a Discord subfile name
post_router.use(bodyIndexIsExist);
post_router.use(bodyDataIsExist);
post_router.use(bodyCreateDiscordSubFileName);

// Middleware to decode base64 data and encrypt
post_router.use(bodyDecodeBase64ToBuffer);
post_router.use(encryptBodyData);

// Upload a file
post_router.post("/upload", files_upload_controller);

export default post_router;

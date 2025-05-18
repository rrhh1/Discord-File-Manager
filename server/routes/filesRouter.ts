import express from "express";
import {
	files_create_controller,
	files_delete_controller,
	files_download_controller,
	files_get_controller,
	files_upload_controller,
} from "../controllers/filesController";
import {
	bodyDataIsExist,
	bodyFileNameIsExist,
	bodyIndexIsExist,
	bodyIsExist,
	createDiscordFileName,
	createDiscordSubFileName,
	decodeBase64ToBuffer,
} from "../middleware/formatConversion";
import {encryptBodyData, encryptFileName, encryptFolderName} from "../middleware/encrypt-decrypt";

const router = express.Router();

router.use(express.json({limit: "15mb"}));
router.use(express.urlencoded({extended: true}));

router.get("/get", files_get_controller);

router.use(bodyIsExist);
router.use(bodyFileNameIsExist);
router.use(createDiscordFileName);
// router.use(encryptFolderName);
router.post("/create", files_create_controller);
router.delete("/delete", files_delete_controller);
router.get("/download", files_download_controller);

// ============ Upload ========================
router.use(bodyIndexIsExist);
router.use(bodyDataIsExist);

router.use(createDiscordSubFileName);
// router.use(encryptFileName);

router.use(decodeBase64ToBuffer);
router.use(encryptBodyData);

router.post("/upload", files_upload_controller);

export default router;

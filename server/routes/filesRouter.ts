import express from "express";
import {create_controller, get_controller, upload_controller} from "../controllers/filesController";
import {
	bodyDataIsExist,
	bodyFileNameIsExist,
	bodyIndexIsExist,
	createDiscordFileName,
	createDiscordFolderName,
	decodeBase64ToBuffer,
} from "../middleware/formatConversion";
import {encryptBodyData, encryptFileName, encryptFolderName} from "../middleware/encrypt-decrypt";

const router = express.Router();

router.use(express.json({limit: "15mb"}));
router.use(express.urlencoded({extended: true}));

router.get("/get", get_controller);

router.use(bodyFileNameIsExist);
router.use(createDiscordFolderName);
// router.use(encryptFolderName);
router.post("/create", create_controller);

// ============ Upload ========================
router.use(bodyIndexIsExist);
router.use(bodyDataIsExist);

router.use(createDiscordFileName);
// router.use(encryptFileName);

router.use(decodeBase64ToBuffer);
router.use(encryptBodyData);

router.post("/upload", upload_controller);

export default router;

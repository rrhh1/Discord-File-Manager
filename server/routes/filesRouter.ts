import express from "express";
import {create_controller, get_controller, upload_controller} from "../controllers/filesController";
import {
	bodyDataIsExist,
	bodyFileNameIsExist,
	createDiscordFileName,
	decode_base64_to_buffer,
} from "../middleware/formatConversion";

const router = express.Router();

router.use(express.json({limit: "15mb"}));
router.use(express.urlencoded({extended: true}));

router.use(bodyFileNameIsExist);
router.use(createDiscordFileName);

router.get("/get", get_controller);
router.post("/create", create_controller);

router.use(bodyDataIsExist);
router.use(decode_base64_to_buffer);

router.post("/upload", upload_controller);

export default router;

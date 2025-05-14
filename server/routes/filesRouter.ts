import express from "express";
import {upload_controller} from "../controllers/filesController";
import {bodyDataIsExist, decode_base64} from "../middleware/formatConversion";

const router = express.Router();

router.use(express.json({limit: "15mb"}));
router.use(express.urlencoded({extended: true}));
router.use(bodyDataIsExist);
router.use(decode_base64);

router.post("/upload", upload_controller);

export default router;

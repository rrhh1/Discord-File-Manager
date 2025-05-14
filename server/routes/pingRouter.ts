import express from "express";
import {ping_controller} from "../controllers/pingController";

const router = express.Router();

router.get("/", ping_controller);

export default router;

import {Request, Response} from "express";
import "dotenv/config";
import {pingTest} from "../src/discordAPI";

export const ping_controller = async (req: Request, res: Response) => {
	try {
		if (!("test" in req.query)) {
			res.status(400).json({message: "Test query required"});
			return;
		}

		await pingTest();
		res.status(200).send("Success");
	} catch (error) {
		console.error("Error sending message:", error);
		res.status(500).json({message: "Internal server error"});
	}
};

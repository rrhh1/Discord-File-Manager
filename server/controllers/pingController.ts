import {Request, Response} from "express";
import client from "../src/index";
import {TextChannel} from "discord.js";
import "dotenv/config";

export const ping_controller = (req: Request, res: Response) => {
	try {
		if (!("test" in req.query)) {
			res.status(400).json({message: "Test query required"});
			return;
		}

		const channel = client.channels.cache.get(process.env.TEST_CHANNEL_ID as string);
		(channel as TextChannel).send({
			content: "Pong!",
		});
		res.status(200).json({message: "pong!"});
	} catch (error) {
		console.error("Error sending message:", error);
		res.status(500).json({message: "Internal server error"});
	}
};

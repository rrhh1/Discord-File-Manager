import {Request, Response} from "express";
import {deleteTextChannel, textChannelIsExist} from "../src/discordAPI";

// Delete a file -- controller
export const files_delete_controller = async (req: Request, res: Response) => {
	const discordFileName = req.body.discordFileName;
	const originalFileName = req.body.fileName;

	try {
		if (!textChannelIsExist(discordFileName)) {
			res.status(400).send("File does not exist");
			return;
		}

		await deleteTextChannel(discordFileName, originalFileName);
		res.status(200).send("File deleted");
	} catch {
		res.status(500).send("Error Deleting Discord File");
	}
};

import {Request, Response} from "express";
import {createTextChannel, textChannelIsExist, uploadFile} from "../src/discordAPI";

// Creeate a file -- controller
export const files_create_controller = async (req: Request, res: Response) => {
	const discordFileName = req.body.discordFileName;
	const originalFileName = req.body.fileName;
	try {
		if (textChannelIsExist(discordFileName)) {
			res.status(400).send("File Name already exists");
			return;
		}

		await createTextChannel(discordFileName, originalFileName);
		res.status(200).json({folderName: discordFileName});
	} catch {
		res.status(500).send("Error Creating Discord File");
	}
};

// Upload a file -- controller
export const files_upload_controller = async (req: Request, res: Response) => {
	const discordFileName = req.body.discordFileName;
	const discordSubFileName = req.body.discordSubFileName;
	const buffer = req.body.data;

	const fileIsExist = textChannelIsExist(discordFileName);
	if (!fileIsExist) {
		res.status(400).send("File does not exist, call /create api to create folder");
		return;
	}

	await uploadFile(discordFileName, discordSubFileName, buffer);
	res.status(200).send("Success");
};

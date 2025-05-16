import {Request, Response} from "express";
import {
	createTextChannel,
	getAllFileNames,
	textChannelIsExist,
	uploadFile,
} from "../src/discordAPI";

export const get_controller = async (req: Request, res: Response) => {
	try {
		const fileNames = await getAllFileNames();
		res.status(200).json({fileNames: fileNames});
	} catch {
		res.status(500).send("Error Fetching Files");
	}
};

export const create_controller = async (req: Request, res: Response) => {
	const discordFolderName = req.body.discordFolderName;
	const originalFileName = req.body.fileName;
	try {
		if (textChannelIsExist(discordFolderName)) {
			res.status(400).send("File Name already exists");
			return;
		}

		await createTextChannel(discordFolderName, originalFileName);
		res.status(200).json({folderName: discordFolderName});
	} catch {
		res.status(500).send("Error Creating Discord Folder");
	}
};

export const upload_controller = async (req: Request, res: Response) => {
	const discordFolderName = req.body.discordFolderName;
	const discordFileName = req.body.discordFileName;
	const buffer = req.body.data;

	const fileIsExist = textChannelIsExist(discordFolderName);
	if (!fileIsExist) {
		res.status(400).send("Folder does not exist, call /create api to create folder");
		return;
	}

	await uploadFile(discordFolderName, discordFileName, buffer);
	res.status(200).send("Success");
};

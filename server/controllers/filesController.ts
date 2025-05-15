import {Request, Response} from "express";
import {createTextChannel, textChannelIsExist, uploadFile} from "../src/discordAPI";

export const get_controller = async (req: Request, res: Response) => {
	const name = req.body.name;
	const extension = req.body.extension;
	var fileName = name + "_" + extension;

	let i = -1;

	try {
		if (textChannelIsExist(fileName)) {
			do {
				i += 1;
				fileName = name + `-${i}` + "_" + extension;
			} while (textChannelIsExist(fileName));
		}

		res.status(200).send(fileName);
	} catch {
		res.status(500).send("Error checking");
	}
};

export const create_controller = async (req: Request, res: Response) => {
	const discordFileName = req.body.discordFileName;
	try {
		if (textChannelIsExist(discordFileName)) {
			res.status(400).send("File Name already exists");
			return;
		}

		await createTextChannel(discordFileName);
		res.status(200).json({folderName: discordFileName});
	} catch {
		res.status(500).send("Error Creating Folder");
	}
};

export const upload_controller = async (req: Request, res: Response) => {
	const discordFileName = req.body.discordFileName;
	const buffer = req.body.data;

	const fileIsExist = textChannelIsExist(discordFileName);
	if (!fileIsExist) {
		res.status(400).send("Folder does not exist, call /create api to create folder");
		return;
	}

	await uploadFile(discordFileName, buffer);
	res.status(200).send("Success");
};

import {Request, Response} from "express";
import {downloadFile, getAllFileNames, getFileSize, textChannelIsExist} from "../src/discordAPI";
import {decryptDiscordData} from "../middleware/encrypt-decrypt";
import {createDiscordFileName} from "../middleware/utility";

// Get all files -- controller
export const files_get_controller = async (req: Request, res: Response) => {
	try {
		var fileNames = await getAllFileNames();
		fileNames = fileNames.sort();

		var fileNames_promises = fileNames.map((fileName) => {
			const result = createDiscordFileName(fileName);
			return getFileSize(result.discordFileName);
		});

		const fileSizes = await Promise.all(fileNames_promises);
		const fileNamesWithSize = Object.fromEntries(
			fileNames.map((fileName, index) => [fileName, fileSizes[index]])
		);
		res.status(200).json(fileNamesWithSize);
	} catch {
		res.status(500).send("Error Fetching Files");
	}
};

// Download a file -- controller
export const files_download_controller = async (req: Request, res: Response) => {
	const discordFileName = req.params.discordFileName;
	const originalFileName = req.params.fileName;

	try {
		if (!textChannelIsExist(discordFileName)) {
			res.status(400).send("File does not exist");
			return;
		}

		var buffers = await downloadFile(discordFileName);
		buffers = buffers.map((buffer) => {
			return decryptDiscordData(buffer as Buffer);
		});

		const buffer = Buffer.concat(buffers as Buffer[]);

		res.setHeader("Content-Type", "application/octet-stream");
		res.setHeader("Content-Disposition", `attachment; filename=${originalFileName}`);
		res.setHeader("Content-Length", buffer.length);

		res.status(200).send(buffer);
	} catch {
		res.status(500).send("Error downloading file");
	}
};

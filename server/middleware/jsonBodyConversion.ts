import {NextFunction, Request, Response} from "express";
import {createDiscordFileName} from "./utility";

// Check if the request body is a valid JSON
export const bodyIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body) {
		res.status(400).send("JSON body not found");
		return;
	}

	next();
};

// Check if the request body contains fileName key
export const bodyFileNameIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.fileName) {
		res.status(400).send("'fileName' not found in JSON");
		return;
	}

	next();
};

// Creates a Discord-compatible file name
export const bodyCreateDiscordFileName = (req: Request, res: Response, next: NextFunction) => {
	const result = createDiscordFileName(req.body.fileName as string);

	req.body.name = result.name;
	req.body.extension = result.extension as string;
	req.body.discordFileName = result.discordFileName;

	next();
};

// Check if the request body contains index key
export const bodyIndexIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.index) {
		res.status(400).send("'index' not found in JSON body");
		return;
	}

	next();
};

// Check if the request body contains data key
export const bodyDataIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.data) {
		res.status(400).send("'data' not found in JSON body");
		return;
	}

	next();
};

// Creates a Discord-compatible subfile name
export const bodyCreateDiscordSubFileName = (req: Request, res: Response, next: NextFunction) => {
	const discordSubFileName = req.body.fileName + "_" + req.body.index;
	req.body.discordSubFileName = discordSubFileName;

	next();
};

// Middleware to decode base64 data to Buffer
export const bodyDecodeBase64ToBuffer = (req: Request, res: Response, next: NextFunction) => {
	const data = req.body.data;
	try {
		req.body.data = Buffer.from(data, "base64");
		next();
	} catch {
		res.status(400).send("Invalid Data");
	}
};

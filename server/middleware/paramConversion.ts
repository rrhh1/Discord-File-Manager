import {NextFunction, Request, Response} from "express";
import {createDiscordFileName} from "./utility";

// Check if the request params are valid
export const paramIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.params) {
		res.status(400).send("Params not found");
		return;
	}
	next();
};

// Check if the request params contain fileName key
export const paramFileNameIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.fileName) {
		res.status(400).send("'fileName' not found in params");
		return;
	}

	next();
};

// Creates a Discord-compatible file name
export const paramCreateDiscordFileName = (req: Request, res: Response, next: NextFunction) => {
	const result = createDiscordFileName(req.params.fileName as string);

	req.params.name = result.name;
	req.params.extension = result.extension as string;
	req.params.discordFileName = result.discordFileName;

	next();
};

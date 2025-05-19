import {NextFunction, Request, Response} from "express";

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
	const fileName_split = (req.params.fileName as string)
		.replaceAll(" ", "-")
		.replaceAll(".", "-")
		.split("-");

	const extension = fileName_split.length > 1 ? fileName_split.pop() : "";
	const name = fileName_split.join("-");

	req.params.name = name;
	req.params.extension = extension as string;
	req.params.discordFileName = name + "_" + extension;

	next();
};

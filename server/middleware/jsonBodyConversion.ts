import {NextFunction, Request, Response} from "express";

export const bodyIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body) {
		res.status(400).send("JSON body not found");
		return;
	}

	next();
};

export const bodyFileNameIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.fileName) {
		res.status(400).send("'fileName' not found in JSON");
		return;
	}

	next();
};

export const createDiscordFileName = (req: Request, res: Response, next: NextFunction) => {
	const fileName_split = (req.body.fileName as string)
		.replaceAll(" ", "-")
		.replaceAll(".", "-")
		.split("-");

	const extension = fileName_split.length > 1 ? fileName_split.pop() : "";
	const name = fileName_split.join("-");

	req.body.name = name;
	req.body.extension = extension;
	req.body.discordFileName = name + "_" + extension;

	next();
};

export const bodyIndexIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.index) {
		res.status(400).send("'index' not found in JSON body");
		return;
	}

	next();
};

export const bodyDataIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.data) {
		res.status(400).send("'data' not found in JSON body");
		return;
	}

	next();
};

export const createDiscordSubFileName = (req: Request, res: Response, next: NextFunction) => {
	const discordSubFileName = req.body.fileName + " " + req.body.index;
	req.body.discordSubFileName = discordSubFileName;

	next();
};

export const decodeBase64ToBuffer = (req: Request, res: Response, next: NextFunction) => {
	const data = req.body.data;
	try {
		req.body.data = Buffer.from(data, "base64");
		next();
	} catch {
		res.status(400).send("Invalid Data");
	}
};

export const encodeBufferToBase64 = (buffer: Buffer) => {
	return buffer.toString("base64");
};

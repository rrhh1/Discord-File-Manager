import * as crypto from "crypto";
import "dotenv/config";
import {Request, Response, NextFunction} from "express";

const encryptName = (text: string, key: Buffer, iv: Buffer) => {
	const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
	return Buffer.from(cipher.update(text, "utf8", "hex") + cipher.final("hex")).toString("base64");
};

const decryptName = (text: string, key: Buffer, iv: Buffer) => {
	const buff = Buffer.from(text, "base64");
	const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
	return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
};

const encryptData = (data: Buffer, key: Buffer, iv: Buffer) => {
	const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
	return Buffer.concat([cipher.update(data), cipher.final()]);
};

const decryptData = (data: Buffer, key: Buffer, iv: Buffer) => {
	const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
	return Buffer.concat([decipher.update(data), decipher.final()]);
};

const makeDiscordNameCompatible = (text: string) => {
	return text.replaceAll("=", "").toLowerCase();
};

// ===================== Middleware =====================================================

export const encryptFolderName = (req: Request, res: Response, next: NextFunction) => {
	const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");
	const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex");

	var discordFolderName = req.body.discordFolderName;
	discordFolderName = encryptName(discordFolderName, key, iv);
	req.body.discordFolderName = makeDiscordNameCompatible(discordFolderName);

	next();
};

export const encryptFileName = (req: Request, res: Response, next: NextFunction) => {
	const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");
	const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex");

	var discordFileName = req.body.discordFileName;
	discordFileName = encryptName(discordFileName, key, iv);
	req.body.discordFileName = makeDiscordNameCompatible(discordFileName);

	next();
};

export const encryptBodyData = (req: Request, res: Response, next: NextFunction) => {
	const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");
	const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex");

	const data = req.body.data;
	req.body.data = encryptData(data, key, iv);

	next();
};

// export const decryptFolderName = (encryptedFolderName: string) => {
// 	const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");
// 	const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex");

// 	return decrypt(encryptedFolderName, key, iv);
// };

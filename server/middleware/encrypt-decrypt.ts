import * as crypto from "crypto";
import "dotenv/config";
import {Request, Response, NextFunction} from "express";

// Encrypt name and data using AES-256-CBC and AES-256-CTR algorithms
// The encryption key and IV are stored in environment variables for security
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

// Middlware to encrypt body data
// From client to server to discord
export const encryptBodyData = (req: Request, res: Response, next: NextFunction) => {
	const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");
	const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex");

	const data = req.body.data;
	req.body.data = encryptData(data, key, iv);

	next();
};

// Middleware to decrypt data
// From discord to server to client
export const decryptDiscordData = (data: Buffer) => {
	const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex");
	const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex");

	return decryptData(data, key, iv);
};

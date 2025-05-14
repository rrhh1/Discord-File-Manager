import {Request, Response} from "express";

export const upload_controller = (req: Request, res: Response) => {
	const fileName_extension = req.body.name + "." + req.body.extension;
	const byteArray = req.body.data;

	console.log(fileName_extension);
	res.status(200).send("Success");
};

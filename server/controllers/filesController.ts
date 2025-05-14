import {Request, Response} from "express";

export const upload_controller = (req: Request, res: Response) => {
	const fileName = req.body.name;
	const byteArray = req.body.data;

	console.log(fileName);
	res.status(200).send("Success");
};

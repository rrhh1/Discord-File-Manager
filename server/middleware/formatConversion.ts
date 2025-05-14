import {NextFunction, Request, Response} from "express";

// export const process_chunks = (req: Request, res: Response, next: NextFunction) => {
// 	req.setEncoding("utf8");
// 	req.rawBody = "" as string;
// 	req.on("data", function (chunk) {
// 		req.rawBody += chunk;
// 	});
// 	req.on("end", function () {
// 		next();
// 	});
// };

export const bodyDataIsExist = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.name) {
		res.status(400).send("'name' not found in JSON");
		return;
	}

	if (!req.body.data) {
		res.status(400).send("'data' not found in JSON");
		return;
	}

	next();
};

export const decode_base64 = (req: Request, res: Response, next: NextFunction) => {
	const data = req.body.data;
	try {
		req.body.data = atob(data);
		next();
	} catch {
		res.status(400).send("Invalid Data");
	}
};

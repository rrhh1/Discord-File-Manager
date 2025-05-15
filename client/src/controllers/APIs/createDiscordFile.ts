import axios from "axios";

export const createDiscordFile = async (fileName: string) => {
	const headers = {
		"Content-Type": "application/json",
	};

	const payload = {
		fileName: fileName,
	};

	return new Promise<boolean>((resolve) => {
		axios
			.post("http://localhost:8000/files/create", payload, {headers: headers})
			.then((response?) => {
				console.log(response?.status);
				resolve(true);
			})
			.catch((error) => {
				console.log(error.status);
				resolve(false);
			});
	});
};

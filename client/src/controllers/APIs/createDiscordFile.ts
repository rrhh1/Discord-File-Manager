import axios from "axios";

// Function to create a Discord file through the server
export const createDiscordFile = (fileName: string) => {
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

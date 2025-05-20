import axios from "axios";

// Function to delete a Discord file through the server
export const deleteDiscordFile = (fileName: string) => {
	const headers = {
		"Content-Type": "application/json",
	};

	const payload = {
		fileName: fileName,
	};

	return new Promise<boolean>((resolve) => {
		axios
			.delete("http://localhost:8000/files/delete", {headers: headers, data: payload})
			.then((response?) => {
				console.log(response?.status);
				resolve(true);
			})
			.catch((error) => {
				console.log(error.status);
				console.log(error);
				resolve(false);
			});
	});
};

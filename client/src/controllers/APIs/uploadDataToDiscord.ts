import axios from "axios";

// Function to upload a Discord file through the server
export const uploadDataToDiscord = (fileName: string, index: string, fileDataBase64: string) => {
	const headers = {
		"Content-Type": "application/json",
	};

	const payload = {
		fileName: fileName,
		index: index,
		data: fileDataBase64,
	};

	return new Promise<boolean>((resolve) => {
		axios
			.post("http://localhost:8000/files/upload", payload, {
				headers: headers,
			})
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

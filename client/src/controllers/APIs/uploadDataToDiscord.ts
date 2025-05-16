import axios from "axios";

export const uploadDataToDiscord = async (
	fileName: string,
	index: string,
	fileDataBase64: string
) => {
	const headers = {
		"Content-Type": "application/json",
	};

	const payload = {
		fileName: fileName,
		index: index,
		data: fileDataBase64,
	};

	return new Promise((resolve) => {
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

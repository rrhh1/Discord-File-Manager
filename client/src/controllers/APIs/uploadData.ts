import axios from "axios";

export const uploadData = async (fileName: string, fileDataBase64: string) => {
	const headers = {
		"Content-Type": "application/json",
	};

	const payload = {
		name: fileName,
		data: fileDataBase64,
	};

	return new Promise((resolve, reject) => {
		axios
			.post("http://localhost:8000/files/upload", payload, {
				headers: headers,
			})
			.catch((error) => {
				console.log(error.response.status);
				reject(false);
			})
			.then((response?) => {
				console.log(response?.status);
				resolve(true);
			});
	});
};

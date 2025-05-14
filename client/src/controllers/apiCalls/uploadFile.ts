import axios from "axios";

export const uploadData = async (data: {}) => {
	const headers = {
		"Content-Type": "application/json",
	};

	return new Promise((resolve, reject) => {
		axios
			.post("http://localhost:8000/files/upload", data, {
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

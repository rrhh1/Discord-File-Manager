import axios from "axios";

// Function to download a Discord file through the server
export const downloadDiscordFile = (fileName: string) => {
	const headers = {
		"Content-Type": "application/octet-stream",
		Accept: "application/octet-stream",
	};

	const URL = encodeURI("http://localhost:8000/files/download/" + fileName);

	return new Promise<Blob | undefined>((resolve) => {
		axios
			.get(URL, {
				headers: headers,
				responseType: "blob",
			})
			.then((response?) => {
				if (response?.status !== 200) {
					console.log("Error: " + response?.status);
					resolve(undefined);
					return;
				}
				resolve(new Blob([response.data]));
			})
			.catch((error) => {
				console.log(error?.status);
				console.log(error);
				resolve(undefined);
			});
	});
};

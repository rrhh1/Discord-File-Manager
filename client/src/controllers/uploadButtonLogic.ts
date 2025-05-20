import {createDiscordFile} from "./APIs/createDiscordFile";
import {uploadDataToDiscord} from "./APIs/uploadDataToDiscord";

// This function handles the logic for the upload button in the file list component.
export const uploadButtonLogic = (
	// isDisabled: boolean,
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
	setTotalChunks: React.Dispatch<React.SetStateAction<number>>,
	setUploadedChunks: React.Dispatch<React.SetStateAction<number>>,
	updateFileList: () => void
) => {
	const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB

	const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
	const file = Array.from(fileInput.files as Iterable<File>)[0];
	if (!file) {
		alert("Please select a file first.");
		return;
	}

	setIsDisabled(true);

	const fileName = file.name;
	const reader = new FileReader();

	reader.onload = async (e) => {
		const arrayBuffer = e.target?.result as ArrayBuffer;
		var byteArray = new Uint8Array(arrayBuffer);

		const response = await createDiscordFile(fileName);
		if (!response) {
			setIsDisabled(false);
			alert("File in Discord already exists!");
			return;
		}

		setTotalChunks(Math.ceil(byteArray.length / CHUNK_SIZE));

		var promises = [];
		for (let i = 0; i < byteArray.length; i += CHUNK_SIZE) {
			const chunk = byteArray.slice(i, i + CHUNK_SIZE);

			var binary = "";
			var len = chunk.byteLength;
			for (var j = 0; j < len; j++) {
				binary += String.fromCharCode(chunk[j]);
			}

			const base64String = window.btoa(binary);
			const index = Math.floor(i / CHUNK_SIZE).toString();

			const promise = uploadDataToDiscord(fileName, index, base64String).then(() => {
				setUploadedChunks((prev) => prev + 1);
			});
			promises.push(promise);
		}

		await Promise.all(promises);
		setIsDisabled(false);

		setTimeout(() => {
			setTotalChunks(0);
			setUploadedChunks(0);
		}, 1000);

		updateFileList();
		fileInput.value = "";
	};

	reader.readAsArrayBuffer(file);
};

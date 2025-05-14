import {uploadData} from "./APIs/uploadData";

export const uploadButtonLogic = (
	// isDisabled: boolean,
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
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

		var promises = [];
		for (let i = 0; i < byteArray.length; i += CHUNK_SIZE) {
			const chunk = byteArray.slice(i, i + CHUNK_SIZE);

			var len = chunk.byteLength;
			var binary = "";
			for (var j = 0; j < len; j++) {
				binary += String.fromCharCode(chunk[j]);
			}

			const base64String = btoa(binary);

			const promise = uploadData(fileName, base64String);
			promises.push(promise);
		}

		await Promise.all(promises);
		setIsDisabled(false);
	};

	reader.readAsArrayBuffer(file);
};

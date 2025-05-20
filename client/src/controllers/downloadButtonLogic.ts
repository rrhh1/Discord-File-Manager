import {downloadDiscordFile} from "./APIs/downloadDiscordFile";

// This function handles the logic for the download button in the file list component.
export const downloadButtonLogic = async (
	fileName: string,
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setIsDisabled(true);
	const blob = await downloadDiscordFile(fileName);

	if (blob === undefined) {
		alert("Error: File not found");
		return;
	}

	// Download the file
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;

	a.download = fileName;
	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);

	setIsDisabled(false);
};

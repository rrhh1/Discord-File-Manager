import {deleteDiscordFile} from "./APIs/deleteDiscordFile";

// This function handles the logic for the delete button in the file list component.
export const deleteButtonLogic = async (
	fileName: string,
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
	updateFileList: () => void
) => {
	setIsDisabled(true);
	await deleteDiscordFile(fileName);

	updateFileList();
	setIsDisabled(false);
};

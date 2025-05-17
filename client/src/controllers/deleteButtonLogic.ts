import {deleteDiscordFile} from "./APIs/deleteDiscordFile";

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

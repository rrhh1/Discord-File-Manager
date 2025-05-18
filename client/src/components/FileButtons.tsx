import {useState} from "react";
import {deleteButtonLogic} from "../controllers/deleteButtonLogic";
import {downloadButtonLogic} from "../controllers/downloadButtonLogic";

interface Prop {
	fileName: string;
	updateFileList: () => void;
}

function FileButtons({fileName, updateFileList}: Prop) {
	const [isDisabled, setIsDisabled] = useState(false);

	return (
		<div>
			<button
				type="button"
				className="btn btn-danger me-2"
				id={fileName + "_Delete"}
				disabled={isDisabled}
				onClick={() => {
					deleteButtonLogic(fileName, setIsDisabled, updateFileList);
				}}
			>
				Delete
			</button>

			<button
				type="button"
				className="btn btn-success"
				id={fileName + "_Download"}
				disabled={isDisabled}
				onClick={() => {
					downloadButtonLogic(fileName, setIsDisabled);
				}}
			>
				Download
			</button>
		</div>
	);
}

export default FileButtons;

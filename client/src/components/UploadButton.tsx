import {useState} from "react";
import {uploadButtonLogic} from "../controllers/uploadButtonLogic";

interface Prop {
	id_name: string;
	updateFileList: () => void;
}

function UploadButton({id_name, updateFileList}: Prop) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [totalChunks, setTotalChunks] = useState(0);
	const [uploadedChunks, setUploadedChunks] = useState(0);

	return (
		<div className="text-center">
			<button
				type="button"
				className="btn btn-secondary"
				id={id_name}
				disabled={isDisabled}
				onClick={() => {
					uploadButtonLogic(
						setIsDisabled,
						setTotalChunks,
						setUploadedChunks,
						updateFileList
					);
				}}
			>
				Upload
			</button>
			<div style={{marginTop: "0.5rem", minHeight: "1.5em"}}>
				<h6 style={{margin: 0, visibility: totalChunks === 0 ? "hidden" : "visible"}}>
					{`Uploaded ${uploadedChunks} / ${totalChunks} chunks`}
				</h6>
			</div>
		</div>
	);
}

export default UploadButton;

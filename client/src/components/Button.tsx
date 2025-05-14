import {useState} from "react";
import {uploadButtonLogic} from "../controllers/uploadButtonLogic";

interface Prop {
	id_name: string;
}

function Button({id_name}: Prop) {
	const [isDisabled, setIsDisabled] = useState(false);

	return (
		<div className="text-center">
			<button
				type="button"
				className="btn btn-secondary"
				id={id_name}
				disabled={isDisabled}
				onClick={() => {
					uploadButtonLogic(setIsDisabled);
				}}
			>
				Upload
			</button>
		</div>
	);
}

export default Button;

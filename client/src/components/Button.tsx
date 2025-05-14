import {useState} from "react";
import {uploadData} from "../controllers/apiCalls/uploadFile";

interface Prop {
	id_name: string;
}

function Button({id_name}: Prop) {
	const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB

	const [isDisabled, setIsDisabled] = useState(false);

	return (
		<div className="text-center">
			<button
				type="button"
				className="btn btn-secondary"
				id={id_name}
				disabled={isDisabled}
				onClick={() => {
					const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
					const file = Array.from(fileInput.files as Iterable<File>)[0];
					if (!file) {
						alert("Please select a file first.");
						return;
					}

					setIsDisabled(true);

					var extension = "";
					let fileName_split = file.name.split(".");
					if (fileName_split.length > 1) {
						extension = fileName_split.pop() as string;
					}
					const fileName = fileName_split.join(".");

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
							const data = {
								name: fileName,
								extension: extension,
								data: base64String,
							};

							const promise = uploadData(data);
							promises.push(promise);
						}

						await Promise.all(promises);
						setIsDisabled(false);
					};

					reader.readAsArrayBuffer(file);
				}}
			>
				Upload
			</button>
		</div>
	);
}

export default Button;

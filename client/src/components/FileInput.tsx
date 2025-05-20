interface Prop {
	id_name: string;
}

//Component to upload a file
function FileInput({id_name}: Prop) {
	return (
		<div className="d-flex justify-content-center">
			<div className="w-50 p-3">
				<label
					htmlFor="formFile"
					className="form-label"
				>
					File to split
				</label>
				<input
					className="form-control"
					type="file"
					id={id_name}
					onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
						const files = Array.from(e.target.files as Iterable<File>);
						console.log("files", files);
					}}
				></input>
			</div>
		</div>
	);
}

export default FileInput;

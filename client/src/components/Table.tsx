import FileButtons from "./FileButtons";

interface Prop {
	id_name: string;
	fileInfo: {[key: string]: string};
	loading: boolean;
	updateFileList: () => void;
}

// Component to display the table of files
function Table({id_name, fileInfo, loading, updateFileList}: Prop) {
	if (loading) {
		return <div></div>;
	}

	return (
		<div className="container mt-5">
			<table
				id={id_name}
				className="table table-bordered"
			>
				<thead>
					<tr className="text-center">
						<th scope="col">#</th>
						<th scope="col">File Name</th>
						<th scope="col">Size</th>
						<th scope="col">Delete/Download</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(fileInfo).map((key, index) => (
						<tr
							className="text-center"
							key={key}
						>
							<th scope="row">{index + 1}</th>
							<td>{key}</td>
							<td>{fileInfo[key]}</td>
							<td className="text-center py-1">
								<FileButtons
									fileName={key}
									updateFileList={updateFileList}
								></FileButtons>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;

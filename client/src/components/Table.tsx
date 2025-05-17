import FileButtons from "./FileButtons";

interface Prop {
	id_name: string;
	fileNames: string[];
	loading: boolean;
	updateFileList: () => void;
}

function Table({id_name, fileNames, loading, updateFileList}: Prop) {
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
						<th scope="col">Delete/Download</th>
					</tr>
				</thead>
				<tbody>
					{fileNames.map((fileName: string, index: number) => (
						<tr
							className="text-center"
							key={fileName}
						>
							<th scope="row">{index + 1}</th>
							<td>{fileName}</td>
							<td className="text-center py-1">
								<FileButtons
									fileName={fileName}
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

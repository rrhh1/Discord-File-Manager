interface Prop {
	id_name: string;
	fileNames: string[];
	loading: boolean;
}

function Table({id_name, fileNames, loading}: Prop) {
	if (loading) {
		return <div></div>;
	}

	return (
		<table
			id={id_name}
			className="table table-hover"
		>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">File Name</th>
				</tr>
			</thead>
			<tbody>
				{fileNames.map((fileName: string, index: number) => (
					<tr key={fileName}>
						<th scope="row">{index + 1}</th>
						<td>{fileName}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Table;

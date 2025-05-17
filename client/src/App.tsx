import FileInput from "./components/FileInput";
import UploadButton from "./components/UploadButton";
import Table from "./components/Table";
import {useState, useEffect} from "react";

import axios from "axios";

function App() {
	const [loading, setLoading] = useState(true);
	const [fileNames, setFileNames] = useState([]);

	const updateFileList = () => {
		setLoading(true);
		const fetchFileList = async () => {
			setLoading(true);
			const response = await axios.get("http://localhost:8000/files/get");
			setFileNames(response.data.fileNames.sort());
			setLoading(false);
		};
		fetchFileList();
	};

	useEffect(() => {
		updateFileList();
	}, []);

	return (
		<>
			<br />
			<br />

			<h1>
				<center>Discord File Storage</center>
			</h1>
			<br />

			<FileInput id_name={"fileUpload"}></FileInput>
			<UploadButton
				id_name={"uploadButton"}
				updateFileList={updateFileList}
			></UploadButton>
			<Table
				id_name={"fileNameTable"}
				fileNames={fileNames}
				loading={loading}
				updateFileList={updateFileList}
			></Table>
		</>
	);
}

export default App;

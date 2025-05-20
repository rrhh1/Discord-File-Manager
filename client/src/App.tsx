import FileInput from "./components/FileInput";
import UploadButton from "./components/UploadButton";
import Table from "./components/Table";
import {useState, useEffect} from "react";

import axios from "axios";

// Main component of the app
function App() {
	const [loading, setLoading] = useState(true);
	const [fileInfo, setFileInfo] = useState({});

	// Function to update the file list
	const updateFileList = () => {
		const formatBytes = (bytes: number, decimals = 2) => {
			if (!+bytes) return "0 Bytes";

			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

			const i = Math.floor(Math.log(bytes) / Math.log(k));

			return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
		};

		// Fetch the file list from the server and update the state
		const fetchFileList = async () => {
			const response = await axios.get("http://localhost:8000/files/get");

			const data: {[key: string]: string} = {};
			Object.keys(response.data).forEach((key) => {
				data[key] = formatBytes(response.data[key]);
			});

			setFileInfo(data);
			setLoading(false);
		};
		fetchFileList();
	};

	// Fetch the file list when the component mounts
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
				fileInfo={fileInfo}
				loading={loading}
				updateFileList={updateFileList}
			></Table>
		</>
	);
}

export default App;

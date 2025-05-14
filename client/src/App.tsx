import FileInput from "./components/FileInput"
import Button from "./components/Button"

function App() {
    return (
        <>
            <br /><br />

            <h1><center>Discord File Storage</center></h1>
            <br />

            <FileInput id_name={"fileUpload"}></FileInput>
            <Button id_name={"uploadButton"}></Button>
        </>
    )
}

export default App

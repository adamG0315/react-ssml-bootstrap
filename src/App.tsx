import { Alert, Container, Spinner } from "react-bootstrap";
import useSSMLData from "./hooks/useSSMLData";
import SSMLPlayer from "./components/SSMLPlayer";
import "./App.css"

function App() {
	const {isLoading, isError, ssmlData} = useSSMLData()

	let content;

	if(isLoading) {
		content = <Spinner animation="border" variant="light"/>
	}

	if(isError) {
		content = <Alert variant="danger">
			Oops, something went wrong...
		</Alert>
	}

	if(ssmlData) {
		content = <SSMLPlayer/>
	}

	return (
		<Container className="App d-flex justify-content-center align-items-center vh-100" >
			{content}
		</Container>
	);
}

export default App;

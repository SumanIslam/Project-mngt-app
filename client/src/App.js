import AddClientForm from "./components/addClientForm.component";
import Clients from "./components/clients.component";
import Projects from "./components/projects.component";
import Header from "./components/navbar.component";

function App() {
  return (
		<>
			<Header />
			<div className="container">
				<AddClientForm />
        <Projects />
				<Clients />
			</div>
		</>
	);
}

export default App;
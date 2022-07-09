import AddClientForm from "./components/addClientForm.component";
import Clients from "./components/clients.component";
import Header from "./components/navbar.component";

function App() {
  return (
		<>
			<Header />
			<div className="container">
				<AddClientForm />
				<Clients />
			</div>
		</>
	);
}

export default App;
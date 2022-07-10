import { Routes, Route }  from 'react-router-dom'
import Header from "./components/navbar.component";
import Home from "./pages/home.component";

function App() {
  return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
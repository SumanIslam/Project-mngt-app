import { Routes, Route }  from 'react-router-dom'
import Header from "./components/navbar.component";
import Home from "./pages/home.component";
import NotFound from './pages/not-found.component';

function App() {
  return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
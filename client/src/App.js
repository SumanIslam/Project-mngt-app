import { Routes, Route }  from 'react-router-dom'
import Header from "./components/navbar.component";
import Home from "./pages/home.component";
import NotFound from './pages/not-found.component';
import Project from './pages/project.component';

function App() {
  return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/projects/:projectId' element={<Project />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
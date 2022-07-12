import AddClientForm from "../components/addClientForm.component";
import AddProjectFormModal from "../components/add-project-form-modal.component";
import Clients from '../components/clients.component';
import Projects from '../components/projects.component'

function Home() {
  return(
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientForm />
        <AddProjectFormModal />
      </div>
      
      <Projects />
      <hr />
      <Clients />
    </>
  )
}

export default Home;

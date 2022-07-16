import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutation/projectMutation'
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

function AddProjectFormModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientID, setClientID] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientID },
    update(cache, { data: { addProject }}) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      })
    }
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(name === '' || description === '' || status === '') {
      return alert('please fill in all fields');
    }

    addProject(name, description, status, clientID);

    setName('');
    setDescription('');
    setStatus('new');
    setClientID('');
  }

  if(loading)  return null;
  if(error) return 'Something Went Wrong';

  return(
    <>
      {/* Button trigger modal */}
      <button 
        type="button"
        className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList className='icon' />
          <div>New Project</div>
        </div>
      </button>

      {/* Modal */}
      <div
        className="modal fade" id="addProjectModal"
        aria-labelledby="addProjectModalLabel" aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="addProjectModalLabel"
              >
                New Project
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                {/* for name field */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder='name...'
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                  />
                </div>
                {/* for description field */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder='description...'
                    value={description}
                    onChange={ (e) => setDescription(e.target.value)}
                  >
                  </textarea>
                </div>
                {/* for status field */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    id='status'
                    className='form-select'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {/* for clientId field */}
                <div className="mb-3">
                  <label className='form-label'>Client</label>
                  <select
                    id="clientId"
                    className="form-select"
                    value={clientID}
                    onChange={ (e) => setClientID(e.target.value) }
                  >
                    <option value="">Select Client</option>
                    {
                      data.clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProjectFormModal;
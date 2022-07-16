import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutation/projectMutation";

function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {id: project.id, name, description, status},
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  })

    const onSubmit = (e) => {
    e.preventDefault();
    
    if(name === '' || description === '' || status === '') {
      return alert('please fill in all fields');
    }

    updateProject(project.id, name, description, status);

    setTimeout(() => {
      window.scrollTo(0,0);
    }, 600);
  }

  return(
    <div className="mt-5">
      <h3>Update Project Details</h3>
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
        {/* onSubmit button */}
        <button
          type="submit"
          data-bs-dismiss="modal"
          className="btn btn-primary"
          >
            Submit
          </button>
      </form>
    </div>
  )
}

export default EditProjectForm;
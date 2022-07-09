import { useMutation } from '@apollo/client'
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutation/clientMutation';
import { GET_CLIENTS } from '../queries/clientQueries';

function AddClientForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: {addClient} }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient]
        }
      })
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(name === '' || email === '' || phone === '') {
      return alert('please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  }

  return(
    <>
      {/* Button trigger modal */}
      <button 
        type="button"
        className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      {/* Modal */}
      <div
        className="modal fade" id="addClientModal"
        aria-labelledby="addClientModalLabel" aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="addClientModalLabel"
              >
                Add Client
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
                {/* for email field */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder='email...'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder='phone...'
                    value={phone}
                    onChange={ (e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-secondary"
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

export default AddClientForm;
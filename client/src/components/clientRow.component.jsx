import { useMutation } from '@apollo/client'
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutation/clientMutation';
import Spinner from './spinner.component';

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id }
  });

  // if (loading) return<Spinner />;
  // if (error) return `Error! ${error.message}`;

  return(
    <tr>
      <td>{ client.name }</td>
      <td>{ client.email }</td>
      <td>{ client.phone }</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default ClientRow;
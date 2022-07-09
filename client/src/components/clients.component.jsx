import { useQuery } from '@apollo/client';

import ClientRow from './clientRow.component';
import { GET_CLIENTS } from '../queries/clientQueries';

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if(loading) return <p>'Loading'</p>;
  if(error) return <p>'Something went wrong'</p>;

  console.log(data);

  return(
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          data.clients.map(client => (
            <ClientRow key={client.id} client={client} />
          ))
        }
      </tbody>
    </table>
  )
}

export default Clients;
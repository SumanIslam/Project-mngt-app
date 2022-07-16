import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner.component";
import ClientInfo from "../components/client-info.component";
import { GET_PROJECT } from "../queries/projectQueries";

function Project() {
  const { projectID } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {id: projectID}
  });

  if(loading) return <Spinner />;
  if(error)  return <p>Something Went Wrong</p>

  return(
    <div className="mx-auto w-75 card p-5 d-flex flex-row justify-content-between">
      <div>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        <ClientInfo client={data.project.client} />
      </div>

      <div>
        <Link to='/' className="btn btn-danger btn-sm w-25 d-inline mx-auto">Back</Link>
      </div>
    </div>
  )
}

export default Project;
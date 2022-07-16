import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner.component";
import ClientInfo from "../components/client-info.component";
import DeleteProject from "../components/delete-project.component";
import EditProjectForm from "../components/edit-project-form.component";
import { GET_PROJECT } from "../queries/projectQueries";

function Project() {
  const { projectID } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {id: projectID}
  });

  if(loading) return <Spinner />;
  if(error)  return <p>Something Went Wrong</p>

  return(
    <div className="mx-auto w-75 card p-5">
      {/* back link */}
      <div style={{textAlign: "right"}}>
        <Link to='/' className="btn btn-danger btn-sm w-25 d-inline mx-auto">Back</Link>
      </div>
      {/* project information */}
      <div>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        {/* client information */}
        <ClientInfo client={data.project.client} />

        {/* Edit project */}
        <EditProjectForm project={data.project} />

        {/* delete project */}
        <DeleteProject id={data.project.id} />
      </div>
    </div>
  )
}

export default Project;
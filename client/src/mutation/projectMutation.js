import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!,$status: ProjectStatus!, $clientID: ID!) {
    addProject(name: $name, description: $description, status: $status, clientID: $clientID) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`

export { ADD_PROJECT, DELETE_PROJECT };

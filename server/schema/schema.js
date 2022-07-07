const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = require('graphql');

const { projects, clients } = require('../assets/sampleData');

const projectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
    client: {
      type: clientType,
      resolve(parentValue, args) {
        console.log(parentValue);
        return clients.find((client) => client.id === parentValue.clientId);
      }
    }
	}),
});

const clientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
	}),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
     type: new GraphQLList(clientType),
     resolve(parentValue, args) {
      return clients;
     }
    },
    client: {
      type: clientType,
      args: {id: { type: GraphQLID }},
      resolve(parentValue, args) {
        return clients.find(client => client.id === args.id);
      }
    },
    projects: {
      type: new GraphQLList(projectType),
      resolve(parentValue, args) {
        return projects;
      }
    },
    project: {
      type: projectType,
      args: {id: { type: GraphQLID }},
      resolve(parentValue, args) {
        return projects.find(project => project.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
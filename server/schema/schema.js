const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = require('graphql');

const { projects, clients } = require('../sampleData');

const projectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		clientId: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
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
    }
  }
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
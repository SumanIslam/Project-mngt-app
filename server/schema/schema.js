const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = require('graphql');

const clientModel = require('../models/client.model');

const projectModel = require('../models/project.model');

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
        return clientModel.findById(parentValue.clientId);
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
      return clientModel.find();
     }
    },
    client: {
      type: clientType,
      args: {id: { type: GraphQLID }},
      resolve(parentValue, args) {
        return clientModel.findById(args.id);
      }
    },
    projects: {
      type: new GraphQLList(projectType),
      resolve(parentValue, args) {
        return projectModel.find();
      }
    },
    project: {
      type: projectType,
      args: {id: { type: GraphQLID }},
      resolve(parentValue, args) {
        return projectModel.findById(args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
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
        return clientModel.findById(parentValue.clientID);
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

const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: {
		addClient: {
			type: clientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				phone: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parentValue, args) {
				const client = new clientModel({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});

				return client.save();
			},
		},
		deleteClient: {
			type: clientType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parentValue, args) {
				return clientModel.findByIdAndDelete(args.id);
			},
		},
		addProject: {
			type: projectType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) },
				status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              'new': {value: 'Not Started'},
              'progress': {value: 'In Progress'},
              'completed': {value: 'Completed'}
            }
          }),
          defaultValue: 'Not Started' 
        },
				clientID: { type: GraphQLNonNull(GraphQLID) },
			},
      resolve(parentValue, args) {
        const project = new projectModel({
          name: args.name,
          description: args.description,
          status: args.status,
          clientID: args.clientID
        });

        return project.save();
      }
		},
    deleteProject: {
      type: projectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parentValue, args) {
        return projectModel.findByIdAndDelete(args.id);
      }
    }
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
  mutation
});
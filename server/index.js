const express = require('express');
const { graphqlHTTP } = require('express-graphql');

require('dotenv').config();

const schema = require("./schema/schema");
const { mongoConnect } = require('./config/connectMongo');


const PORT = process.env.PORT || 5000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

function startServer() {
  mongoConnect();

  app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}...`);
	});
}

startServer();
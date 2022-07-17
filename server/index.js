const express = require('express');
const path = require('path');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

require('dotenv').config();

const schema = require("./schema/schema");
const { mongoConnect } = require('./config/connectMongo');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")));

	app.get("*", (req, res) => {
		res.sendFile(
			path.join(__dirname, "..", "client", "build", "index.html")
		);
	});
}

function startServer() {
  mongoConnect();
  console.log(path.join(__dirname, "..", "client", "build", "index.html"));
  app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}...`);
	});
}

startServer();
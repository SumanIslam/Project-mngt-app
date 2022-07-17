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

// if (process.env.NODE_ENV === "production") {
	app.use(express.static('public'));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "public", "index.html")
		);
	});
// }

function startServer() {
  mongoConnect();
  console.log(path.resolve(__dirname,"..", "public", "index.html"));
  app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}...`);
	});
}

startServer();
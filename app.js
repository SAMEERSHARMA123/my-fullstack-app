const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../Backend/GraphQL/typeDefs');
const resolvers = require('../Backend/GraphQL/resolvers');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DB =  require("../Backend/DB/db")
DB()

const app = express();
const port = process.env.PORT ;
console.log(port);


// ✅ CORS should be applied to Express, not ApolloServer
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app }); // Apollo middleware for /graphql

  app.get('/', (req, res) => {
    res.send('server is running....');
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();

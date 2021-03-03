const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use(morgan('tiny'));
app.use(cors());
// app.use(helmet()); // Don't use for repl.it
server.applyMiddleware({
  app,
  path: '/graphql',
  cors: {
    origin: '*',
  },
  bodyParserConfig: true,
});

app.use('/', (req, res) => {
  res.status(200);
  res.send('AudiusTree API w/ GraphQL!');
  res.end();
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.info(`🚀 - Listening at locahost:${port}${server.graphqlPath}`);
});

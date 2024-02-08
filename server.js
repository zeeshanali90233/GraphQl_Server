import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Users, Qoutes } from "./FakeDB.js";
// This is to define the possible queries from the client side
const typeDefs = gql`
  type User {
    id: ID
    name: String
    password: String
    qoutes: [Qoute]
  }

  type Qoute {
    qoute: String
    by: ID!
  }
  type Query {
    users: [User]
    getSingleUser(id: ID!): User
    qoutes: [Qoute]
  }
`;

// This is the resolvers, like handlers for the above queries
const resolvers = {
  Query: {
    users: () => Users,
    qoutes: () => Qoutes,
    getSingleUser: (_, { id }) => Users.find((user) => user.id == id),
  },

  User: {
    qoutes: (ur) => Qoutes.filter((qoute) => qoute.by == ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(url);
});

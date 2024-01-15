// require("dotenv").config();
const { mongoConnect } = require("./config/mongoConfig");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/UserSchemas");
const { postTypeDefs, postResolvers } = require("./schemas/PostShcemas");
const {
  followingTypeDefs,
  followingResolvers,
} = require("./schemas/FollowSchemas");

const { responsePostTypeDefs } = require("./schemas/PostResponses");
const { responseFollowType } = require("./schemas/FollowResponses");
const { responseTypeDefs } = require("./schemas/UserResponses");
const authentication = require("./helpers/auth");

const PORT = 3001;

const server = new ApolloServer({
  typeDefs: [
    userTypeDefs,
    postTypeDefs,
    responseTypeDefs,
    responsePostTypeDefs,
    responseFollowType,
    followingTypeDefs,
  ],
  resolvers: [userResolvers, postResolvers, followingResolvers],
  introspection: true,
});

(async () => {
  try {
    await mongoConnect();
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      context: async ({ req, res }) => {
        return {
          doAuthentication: () => authentication(req),
        };
      },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();

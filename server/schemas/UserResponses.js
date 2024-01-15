const typeDefs = `#graphql
  interface Response {
    statusCode: Int!
    message: String
    error: String
  }

  type UserLoginData {
    token: String
  }

  type GetUsers implements Response {
   statusCode: Int!
   message: String!
   error: String
   data: UserFollowOutput
 }

  type GetAllUser implements Response {
   statusCode: Int!
   message: String!
   error: String
   data: [User]
 }

  type ResponseProfile implements Response {
    statusCode: Int!
    message: String!
    error: String
    data: MyProfile
  }

`;

module.exports = {
  responseTypeDefs: typeDefs,
};

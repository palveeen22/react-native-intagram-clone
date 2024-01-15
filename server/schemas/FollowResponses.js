const responseFollowType = `#graphql
    interface Response {
        statusCode: Int!
        message: String!
        error: String
    }

    type ResponseGetFollow implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: Follow
    }
    
    type ResponseCreateFollow implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: OneFollow
    }
`;

module.exports = {
  responseFollowType,
};

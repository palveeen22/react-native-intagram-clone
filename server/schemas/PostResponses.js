const responsePostTypeDefs = `#graphql
    interface Response {
        statusCode: Int!
        message: String!
        error: String
    }

    type ResponseGetPostAll implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: [PostWithUser]
    }

    type ResponseGetPostOne implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: PostDetail
    }
    
    type ResponseCreatePost implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: Post
    }

    type ResponseCreateLike implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: Likes
    }

    type ResponseCreateComment implements Response {
        statusCode: Int!
        message: String!
        error: String
        data: [Comments]
    }
`;

module.exports = {
  responsePostTypeDefs,
};

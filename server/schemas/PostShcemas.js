const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const {
  getAllPosts,
  getPostId,
  createPost,
  createComment,
  createLike,
} = require("../model/PostModel");

const redis = require("../config/redis");

const typeDefs = `#graphql
      type Post {
        _id: ID
        content: String!
        description: String
        tags: [String]
        imgUrl: String
        authorId: ID!
        like: [Likes]
        comment: [Comments]
        createdAt: String
        updatedAt: String
    }

      type UserPost {
        _id: ID
        username: String
        profilePicture: String
     }

     type PostWithUser {
        _id: ID
        content: String!
        description: String
        tags: [String]
        imgUrl: String
        authorId: ID!
        like: [Likes]
        comment: [Comments]
        Author: UserPost
    }


     type PostDetail {
        _id: ID
        content: String!
        description: String
        tags: [String]
        imgUrl: String
        authorId: ID!
        like: [Likes]
        comment: [Comments]
        Author: UserPost
    }

    type UserDetail {
        _id: ID
        username: String
        name: String
    }

    type Likes {
        username: String
        createdAt: String
        updatedAt: String
    }

    type Comments {
        content: String
        username:String
        createdAt: String
        updatedAt: String
    }

     input CommentInput {
        content: String
        username:String
        createdAt: String
        updatedAt: String
    }

      input LikeInput {
        username:String
        createdAt: String
        updatedAt: String
    }

    input PostCreate {
        content: String
        description: String
        imgUrl: String
        tags: [String]
        authorId: ID!
    } 

    type Query {
        getPosts: ResponseGetPostAll
        getPostById(id: ID!): ResponseGetPostOne
    }

    type Mutation {
        postCreate(input: PostCreate): ResponseCreatePost
        commentCreate(id:ID,input: CommentInput): ResponseCreateComment
        likeCreate(id:ID,input:LikeInput): ResponseCreateLike
    }
`;

const resolvers = {
  Query: {
    getPosts: async (_, args, contextValue) => {
      await contextValue.doAuthentication();

      let result;
      const redisKey = "post:sortedByCreatedAt";

      try {
        const postCache = await redis.get(redisKey);
        if (postCache) {
          result = JSON.parse(postCache);
        } else {
          const posts = await getAllPosts();

          await redis.set(redisKey, JSON.stringify(posts));
          result = posts;
        }

        // console.log("result", JSON.stringify(result, null, 2));

        return {
          statusCode: 200,
          message: "Success get posts",
          data: result,
        };
      } catch (error) {
        console.log(error);
        throw error;
        // throw new GraphQLError(`${error.message}`);
      }
    },

    getPostById: async (_, { id }, contextValue) => {
      await contextValue.doAuthentication();

      try {
        const post = await getPostId(id);

        // console.log("result", JSON.stringify(result, null, 2));

        return {
          statusCode: 200,
          message: "Success get posts",
          data: post,
        };
      } catch (error) {
        console.log(error);
        throw error;
        // throw new GraphQLError(`${error.message}`);
      }
    },
  },
  Mutation: {
    postCreate: async (_, { input }, contextValue) => {
      const userLogin = await contextValue.doAuthentication();
      input.authorId = userLogin.id;
      try {
        const post = await createPost(input);

        //invalidate
        await redis.del("post:sortedByCreatedAt");

        return {
          statusCode: 200,
          message: "Successfully added post",
          data: post,
        };
      } catch (error) {
        console.log(error);
        // throw new GraphQLError("An error while Seeding user");
        throw error;
      }
    },
    likeCreate: async (_, { id, input }, contextValue) => {
      const userLogin = await contextValue.doAuthentication();
      // console.log(userLogin, "xixixi");
      input.username = userLogin.username;
      try {
        const like = await createLike(id, input);

        if (!like) {
          throw new GraphQLError("failed to add new like");
        }

        //invalidate
        const postCacheKey = `post:${id}`;
        await redis.set(postCacheKey, JSON.stringify(like));

        return {
          statusCode: 200,
          message: "Successfully registered",
          data: like,
        };
      } catch (error) {
        console.log(error);
        // throw new GraphQLError(`${error.message}`);
        throw error;
      }
    },
    commentCreate: async (_, { id, input }, contextValue) => {
      const userLogin = await contextValue.doAuthentication();
      input.username = userLogin.username;
      // console.log(input, "input <===");
      try {
        const comment = await createComment(id, input);
        // console.log(comment);

        if (!comment) {
          throw new GraphQLError("failed to add new comment");
        }

        //invalidate
        const postCacheKey = `post:${id}`;
        await redis.set(postCacheKey, JSON.stringify(comment));

        return {
          statusCode: 200,
          message: "Successfully create commment",
          data: comment,
        };
      } catch (error) {
        console.log(error);
        throw error;
        // throw new GraphQLError(`${error.message}`);
      }
    },
  },
};

module.exports = {
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};

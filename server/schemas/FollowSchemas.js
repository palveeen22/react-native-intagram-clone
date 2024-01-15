const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const { createFollow } = require("../model/FollowModel");
const redis = require("../config/redis");

const followingTypeDefs = `#graphql
    type UserFollowing {
        _id: ID
        username: String
        name: String
    }

    type UserFollower{
        _id: ID
        username: String
        name: String
    }

    input FollowInput {
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

     type FollowData {
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Follow {
        _id: ID
        followingId: UserFollowing
        followerId: UserFollower
    }

    type OneFollow {
        _id: ID
        followingId: UserFollowing
        followerId: UserFollower
    }

     type FollowRes {
      statusCode: Int!
      message: String!
      error: String
      data: FollowData
    }

    type GetMe {
      statusCode: Int!
      message: String!
      error: String
      data: MyProfile
    }

    type Mutation {
        createFollow(input:FollowInput):FollowRes
    }
`;

const followingResolvers = {
  Mutation: {
    createFollow: async (_, { input }, contextValue) => {
      const userLogin = await contextValue.doAuthentication();
      input.followerId = userLogin.id;
      try {
        const redisKey = `follow:${input.followerId}:${input.followingId}`;
        const redisKeyValue = await redis.get(redisKey);
        if (redisKeyValue) {
          return {
            statusCode: 409,
            message: "ALready follow this user",
            error: null,
            data: null,
          };
        }

        if (input.followerId === input.followingId) {
          return {
            statusCode: 409,
            message: "cannot follow your self",
            error: null,
            data: null,
          };
        }

        await redis.set(redisKey, true);

        const newFollower = await createFollow(input);

        return {
          statusCode: 200,
          message: "Successfully follow",
          data: newFollower,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  followingTypeDefs,
  followingResolvers,
};

const { GraphQLError } = require("graphql");
const {
  getAllUser,
  register,
  findMe,
  findOneUser,
  findOne,
  findByUsernameOrName,
} = require("../model/UserModel");
const { comparePassword } = require("../helpers/bcript");
const { signToken } = require("../helpers");
const validator = require("validator");

const typeDefs = `#graphql
  type User {
    _id: ID
    name:String
    username: String
    email: String
    password: String
    profilePicture: String
  }

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

  type AllUser {
    _id: ID
    name:String
    username: String
    email: String
    profilePicture: String
  }

  input RegisterInput {
    name:String
    username: String!
    email: String!
    password: String!
    profilePicture: String
  }

  type ResUserLoginNew {
    token: String!
  }

  type RegisterNew{
    _id: ID
    name:String
    username: String
    email: String
    profilePicture: String
  }

  type Followers {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    }

    type MyProfile {
    _id: ID
    name:String
    username: String!
    email: String!
    profilePicture: String
    Following:[Followers]
    Followers:[Followers]
    Posts:[Post]
    }

  type ResponseUser {
    statusCode: Int!
    message: String
    error: String
    data: RegisterNew
  }

  type UserFollowOutput {
    _id: ID
    name: String
    username: String
    email: String
    profilePicture: String
    FollowingConnection:[Followers]
    Followers: [Followers]
    FollowersConnection:[Followers]
    follFollowingower: [Followers]
  }

  type Query{
  getAllUsers: GetAllUser
  getMe(id:ID!):GetMe
  profileUser(id:ID!):  ResponseProfile
  getUserById(id:ID!): GetUsers
  searchUsers(query: String!): [User]
  }
  
  type Mutation {
    register(input: RegisterInput): ResponseUser
    login(email: String!, password: String!):  ResUserLoginNew
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await getAllUser();
        // console.log(JSON.stringify(users, null, 2), "===========");

        return {
          statusCode: 200,
          message: "successfully read users",
          data: users,
        };
      } catch (error) {
        throw new GraphQLError("An error while retrieved data users");
      }
    },

    getMe: async (_, { id }, contextValue) => {
      const userLogin = await contextValue.doAuthentication();
      id = userLogin.id;
      try {
        const user = await findMe(id);
        // console.log(user, "teetete");

        return {
          statusCode: 200,
          message: "successfully get profile",
          data: user,
        };
      } catch (error) {
        console.log(error);
      }
    },

    getUserById: async (_, args) => {
      try {
        const { id } = args;

        const user = await findOne(id);
        // console.log(JSON.stringify(user, null, 2), "<<<<<");

        return {
          statusCode: 200,
          message: "successfully read users details",
          data: user,
        };
      } catch (error) {
        console.log(error);
        console.log(error);
        throw new GraphQLError(`${error.message}`);
      }
    },

    profileUser: async (_, { id }, contextValue) => {
      const resContext = await contextValue.doAuthentication();
      // console.log(resContext, "<<< res context");
      try {
        const user = await findOne({
          id,
        });

        // console.log(user, "xoxooxo");

        return {
          statusCode: 200,
          message: "successfully get profile",
          data: user,
        };
      } catch (error) {
        throw new GraphQLError("An error while retrieved data users");
      }
    },

    searchUsers: async (_, { query }) => {
      // const loggedUser = await context.tokenGuard();
      try {
        const users = await findByUsernameOrName(query);
        return users;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const { name, username, email, password, profilePicture } = args.input;

        const user = await register({
          name,
          username,
          email,
          password,
          profilePicture,
        });

        //validate email
        if (!validator.isEmail(email)) {
          throw new GraphQLError("Invalid Email Format");
        }

        // const existingUser = await findOneUser({ email });

        // if (existingUser) {
        //   throw new GraphQLError("Email already exist");
        // }

        // console.log(user, "<===");

        return {
          statusCode: 200,
          message: `Successfully to register`,
          data: user,
        };
      } catch (error) {
        throw error;
      }
    },
    login: async (_, args) => {
      try {
        const { email, password } = args;
        // console.log(email, password, "<====");

        const user = await findOneUser({ email });
        // console.log(user, "<===");

        if (!user || !comparePassword(password, user.password)) {
          throw new GraphQLError("Invalid username or password", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }

        const payload = {
          id: user._id,
          email: user.email,
        };

        const token = signToken(payload);

        return {
          token,
        };
      } catch (error) {
        throw new GraphQLError("Invalid username or password");
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};

const { GraphQLError } = require("graphql");
const { getDatabase } = require("../config/mongoConfig");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const database = getDatabase();

  //get connection from compas
  const followCollection = database.collection("Follows");

  return followCollection;
};

const createFollow = async (input) => {
  input.createdAt = new Date();
  input.updatedAt = new Date();
  input.followingId = new ObjectId(input.followingId);
  try {
    // const newFollower = await createFollow(input);

    const follower = await getCollection().insertOne(input);

    return await getCollection().findOne({
      _id: new ObjectId(follower.insertedId),
    });
  } catch (error) {
    throw new GraphQLError(error);
  }
};

// const findAllFollow = async () => {
//   const result = await database
//     .collection(follow_collection)
//     .find({})
//     .toArray();
//   return result;
// };

// const findFollowById = async (_id) => {
//   const result = await database.collection(follow_collection).findOne({ _id });
//   return result;
// };

// const findFollowing = async (followingId) => {
//   const result = await database
//     .collection(follow_collection)
//     .findOne({ followingId });

//   return result;
// };

// const findFollowers = async (followersId) => {
//   const result = await database
//     .collection(follow_collection)
//     .findOne({ followersId });

//   return result;
// };

module.exports = {
  createFollow,
};

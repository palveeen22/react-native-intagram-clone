const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConfig");
const { hashPassword } = require("../helpers/bcript");

const getCollection = () => {
  const database = getDatabase();
  const userCollection = database.collection("Users");

  return userCollection;
};

const getAllUser = async () => {
  const users = await getCollection().find().toArray();
  // console.log(users, "DB");
  return users;
};

const register = async (payload = {}) => {
  payload.createdAt = new Date();
  payload.updatedAt = new Date();
  try {
    payload.password = hashPassword(payload.password);

    //  if (await findUserByUsername(username)) throw { name: "invalidUsername" };
    //  if (await findUserByEmail(email)) throw { name: "invalidEmail" };
    //  if (password.length < 6) throw { name: "invalidPassword" };
    //  if (email.split("@").length !== 2) throw { name: "invalidEmailFormat" };

    const newUser = await getCollection().insertOne(payload);

    const user = await findUserById(newUser.insertedId, true);

    return user;
  } catch (error) {
    throw error;
  }
};

const findMe = async (id) => {
  try {
    // const user = await getCollection().findOne(id);
    const profile = await getCollection()
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "Follows",
            localField: "_id",
            foreignField: "followingId",
            as: "Following",
          },
        },
        {
          $lookup: {
            from: "Follows",
            localField: "_id",
            foreignField: "followerId",
            as: "Followers",
          },
        },
        {
          $lookup: {
            from: "Posts",
            localField: "_id",
            foreignField: "authorId",
            as: "Posts",
          },
        },
        {
          $unwind: {
            path: "$Users",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    if (profile.length === 0) {
      return null;
    }

    return profile[0];
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id, hidePassword) => {
  const options = {};

  if (hidePassword) {
    options.projection = {
      password: 0,
    };
  }
  const user = await getCollection().findOne({
    _id: new ObjectId(id),
  });

  return user;
};

const findByUsernameOrName = async (query) => {
  try {
    const users = await getCollection()
      .find(
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { username: { $regex: query, $options: "i" } },
          ],
        },
        { projection: { password: 0 } }
      )
      .toArray();
    return users;
  } catch (error) {
    throw error;
  }
};

const findOne = async (id) => {
  try {
    const user = await getCollection()
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "Follows",
            localField: "_id",
            foreignField: "followingId",
            as: "Following",
          },
        },
        {
          $lookup: {
            from: "Follows",
            localField: "_id",
            foreignField: "followerId",
            as: "Followers",
          },
        },
        {
          $lookup: {
            from: "Posts",
            localField: "_id",
            foreignField: "authorId",
            as: "Posts",
          },
        },
        {
          $unwind: {
            path: "$Users",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            password: 0,
            "Followers.password": 0,
            "Following.password": 0,
          },
        },
      ])
      .toArray();

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findOneUser = async (filterQuery = {}, hidePassword = false) => {
  const options = {};

  if (hidePassword) {
    options.projection = {
      password: 0,
    };
  }

  const user = await getCollection().findOne(filterQuery, options);

  return user;
};

module.exports = {
  getAllUser,
  register,
  findMe,
  findUserById,
  findOneUser,
  findOne,
  findByUsernameOrName,
};

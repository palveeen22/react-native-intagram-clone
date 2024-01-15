const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConfig");
const { GraphQLError } = require("graphql");
const redis = require("../config/redis");

const getCollection = () => {
  const database = getDatabase();

  //get connection from compas
  const postCollection = database.collection("Posts");

  return postCollection;
};

/*
 start from here for method
*/

const getAllPosts = async () => {
  const postCollection = getCollection();
  // const posts = await postCollection.find().sort({ createdAt: 1 }).toArray();
  const posts = await postCollection
    .aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: {
          path: "$Author",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
    .toArray();
  if (posts.length === 0) {
    return null;
  }

  // console.log(posts, "<<<<<");

  return posts;
  // return posts;
};

const getPostId = async (id) => {
  const postCollection = getCollection();
  const post = await postCollection
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: {
          path: "$Author",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
    .toArray();

  if (post.length === 0) {
    return null;
  }

  return post[0];
};

const createPost = async (payload) => {
  payload.createdAt = new Date();
  payload.updatedAt = new Date();
  try {
    const newPost = await getCollection().insertOne(payload);

    const post = await getCollection().findOne({
      _id: new ObjectId(newPost.insertedId),
    });

    return post;
  } catch (error) {
    throw error;
  }
};

//create like
const createLike = async (id, payload) => {
  payload.createdAt = new Date();
  payload.updatedAt = new Date();
  try {
    await getCollection().updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $addToSet: {
          like: payload,
        },
      }
    );

    return await getCollection().findOne({
      _id: new ObjectId(id),
    });
  } catch (error) {
    throw error;
  }
};

//create comment
const createComment = async (id, payload) => {
  try {
    payload.createdAt = new Date();
    payload.updatedAt = new Date();

    await getCollection().updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $addToSet: {
          comment: payload,
        },
      }
    );

    return await getCollection().findOne({
      _id: new ObjectId(id),
    });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getCollection,
  getAllPosts,
  getPostId,
  createPost,
  createComment,
  createLike,
};

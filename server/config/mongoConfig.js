const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://alvinprtm22:pVV0oihArR8yLVUB@alvin-dev-cluster.6jxchcp.mongodb.net/";

const client = new MongoClient(uri);

let database;

async function mongoConnect() {
  try {
    await client.connect();
    console.log(`Successfully connect to mongo`);
    database = client.db("Instagram_Project");

    return client;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log(`Error while connect to mongo`);
    throw error;
  }
}

function getDatabase() {
  return database;
}

module.exports = {
  mongoConnect,
  getDatabase,
};

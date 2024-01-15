const { GraphQLError } = require("graphql");
const { findUserByEmail } = require("../model/UserModel");
const { verifyToken } = require("../helpers");

const auth = async (req) => {
  // console.log(req.headers);
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "unauthenticated" };

    const token = authorization.split(" ")[1];
    const payload = verifyToken(token);
    const user = await findUserByEmail(payload.email);
    if (!user) throw { name: "unauthenticated" };

    return {
      id: payload.id,
      email: payload.email,
    };
  } catch (error) {
    // console.log(error, '<<< from authentication');
    switch (error.name) {
      case "unauthenticated":
        throw new GraphQLError("You are not authenticated", {
          extensions: {
            http: "401",
            code: "UNAUTHENTICATED",
          },
        });
      default:
        throw new GraphQLError("An error while Authentication Check");
    }
  }
};

module.exports = {
  auth,
};

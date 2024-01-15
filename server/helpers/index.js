const jwt = require("jsonwebtoken");
const brcyptjs = require("bcryptjs");
const SECRET = "abogoboga";

const hashPassword = (password) => {
  return brcyptjs.hashSync(password);
};

const comparePassword = (password, hash) => {
  return brcyptjs.compareSync(password, hash);
};

const signToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const verifyToken = (payload) => {
  console.log(jwt.verify(payload, SECRET));
  return jwt.verify(payload, SECRET);
};

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
};

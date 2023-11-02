const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authMidlleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
  const token = authHeader.split(' ')[1]

  try {
    const {  userid, username } = jwt.verify(token, process.env.JWT_SECRET);
    req.users = {  userid, username };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};
module.exports = authMidlleware;

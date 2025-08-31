const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET; //JWT secret from environment variables
const expiration = "24d"; //token expiration time

module.exports = {
  //authentication middleware to verify JWT tokens
  authMiddleware: function (req, res, next) {
    let token = req.headers.authorization; //get token from authorization header

    if (token) {
      token = token.split(" ").pop().trim(); //extract token from "Bearer <token>" format
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "You must be logged in to do that" }); //no token provided
    }

    try {
      const { data } = jwt.verify(token, secret); //verify token and decode payload
      req.user = data; //attach user data to request object
      next(); //proceed to next middleware/route
    } catch (err) {
      console.error("Invalid token:", err); //log error for debugging
      return res.status(401).json({ message: "Invalid token" }); //invalid or expired token
    }
  },

  //function to create signed JWT tokens for authentication
  signToken: function ({ username, email, _id }) {
    //user data to include in token
    const payload = { username, email, _id };
    //sign and return token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

const jwt = require("jsonwebtoken"); //JWT secret from environment variables

const secret = process.env.JWT_SECRET;
const expiration = "24d";

if (!secret) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

// helper for sending auth errors
const authError = (res, message = "Unauthorized") => {
  return res.status(401).json({ message });
};

module.exports = {
  //authentication middleware to verify JWT tokens
  authMiddleware: (req, res, next) => {
    // allow token from header, query, or body
    let token = req.headers.authorization || req.query.token || req.body.token;

    if (token && token.startsWith("Bearer ")) {
      //extracts just the JWT token part from the "Bearer <token>" header format.
      token = token.split(" ")[1].trim();
    } else {
      return authError(res, "You must be logged in");
    }

    try {
      const { data } = jwt.verify(token, secret); //verify token and decode payload
      req.user = data; //attach user data to request object
      next(); //proceed to next middleware/route
    } catch (err) {
      console.error("Invalid token:", err); //log error for debugging

      if (err.name === "TokenExpiredError") {
        return authError(res, "Session expired, please log in again");
      }
      return authError(res, "Invalid token");
    }
  },
  //function to create signed JWT tokens for authentication
  signToken: ({ username, email, _id }) => {
    //user data to include in token
    const payload = { username, email, _id };
    //sign and return token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

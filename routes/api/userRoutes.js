const router = require("express").Router();
const User = require("../../models/User");
const { signToken } = require("../../Utils/Auth");

//POST /api/users/register - create a new user
router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error("User registration error:", err.message);
    res.status(400).json(err);
  }
});

// POST /api/users/login - Authenticate a user and return a token
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "can't find this user " });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);

  if (!correctPw) {
    return res.status(400).json({ message: "wrong password" });
  }
  const token = signToken(user);
  res.json({ token, user });
});

module.exports = router;

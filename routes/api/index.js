const router = require("express").Router();
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");

//mount user routes at /api/users endpoint
router.use("/users", userRoutes);
//mount note routes at /api/notes endpoint
router.use("/notes", noteRoutes);

module.exports = router;

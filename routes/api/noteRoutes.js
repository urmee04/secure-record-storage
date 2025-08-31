const router = require("express").Router();
const { Note } = require("../../models/Note");
const { authMiddleware } = require("../../Utils/Auth");

// Apply authMiddleware to all note routes
router.use(authMiddleware);

// GET /api/notes - Get only the logged-in user's notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/notes - Create a new note for the logged-in user
router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user._id, // associate note with logged-in user
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/notes/:id - Update note only if owned by logged-in user
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note found with this id!" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to update this note" });
    }

    Object.assign(note, req.body);
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/notes/:id - Delete note only if owned by logged-in user
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note found with this id!" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this note" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

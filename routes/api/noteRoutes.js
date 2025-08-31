const router = require("express").Router();
const { Note } = require("../../models/Note");
const { authMiddleware } = require("../../Utils/Auth");

// GET /api/notes - Get all notes for the logged-in user
router.get("/", async (req, res) => {
  // This currently finds all notes in the database.
  // It should only find notes owned by the logged in user.
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/notes - Create a new note
router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      // The user ID needs to be added here
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/notes/:id - Update a note
router.put("/:id", async (req, res) => {
  try {
    // This needs an authorization check
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) {
      return res.status(404).json({ message: "No note found with this id!" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", async (req, res) => {
  try {
    // This needs an authorization check
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note found with this id!" });
    }
    res.json({ message: "Note deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

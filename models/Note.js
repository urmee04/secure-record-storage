const { Schema, model } = require("mongoose");

//create note schema
const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//create note model
const Note = model("Note", noteSchema);

//export model
module.exports = Note;

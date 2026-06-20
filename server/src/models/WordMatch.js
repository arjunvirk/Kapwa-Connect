import mongoose from "mongoose";

const pairSchema = mongoose.Schema({
  tagalog: {
    type: String,
    required: true,
  },

  english: {
    type: String,
    required: true,
  },
});

const wordMatchSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    pairs: [pairSchema],

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const WordMatch = mongoose.model("WordMatch", wordMatchSchema);

export default WordMatch;

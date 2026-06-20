import mongoose from "mongoose";

const fillBlankSchema = new mongoose.Schema(
  {
    sentence: {
      type: String,
      required: true,
      trim: true,
    },

    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        type: String,
      },
    ],

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

const FillBlank = mongoose.model("FillBlank", fillBlankSchema);

export default FillBlank;

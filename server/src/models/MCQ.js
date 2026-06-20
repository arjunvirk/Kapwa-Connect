import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  options: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],

  correctAnswer: {
    type: Number,
    required: true,
  },
});

const mcqSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    questions: [questionSchema],

    deadline: {
      type: Date,
    },
  },
  { timestamps: true },
);

const MCQ = mongoose.model("MCQ", mcqSchema);
export default MCQ;

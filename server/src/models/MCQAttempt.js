import mongoose from "mongoose";

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionIndex: {
    type: Number,
    required: true,
  },

  selectedOption: {
    type: Number,
    required: true,
  },
});

const mcqAttemptSchema = new Schema(
  {
    // which mcq test was attempted

    mcq: {
      type: Schema.Types.ObjectId,
      ref: "MCQ",
      required: true,
    },

    //   which student attempted it
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //   student's answer
    answers: [answerSchema],

    //   calculated score
    score: {
      type: Number,
      default: 0,
    },

    // optional status
    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted",
    },
  },
  { timestamps: true },
);

const MCQAttempt = mongoose.model("MCQAttempt", mcqAttemptSchema);
export default MCQAttempt;
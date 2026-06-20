import mongoose from "mongoose";

const { Schema } = mongoose;

const homeworkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // teacher uploaded file

    fileUrl: {
      type: String,
    },

    // teacher

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // assigned students

    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // student submissions

    submissions: [
      {
        // student id

        student: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },

        // written answer

        submission: {
          type: String,
        },

        // uploaded file by student

        submissionFile: {
          type: String,
        },

        // review status

        status: {
          type: String,

          enum: ["pending", "submitted", "reviewed"],

          default: "pending",
        },

        // submission date

        submittedAt: {
          type: Date,

          default: Date.now,
        },
      },
    ],

    // optional deadline

    deadline: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

const Homework = mongoose.model("Homework", homeworkSchema);

export default Homework;

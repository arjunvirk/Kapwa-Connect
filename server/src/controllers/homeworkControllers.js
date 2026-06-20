import Homework from "../models/Homework.js";
import User from "../models/User.js";

export const createHomework = async (req, res, next) => {
  try {
    const { title, description, assignedTo, deadline, assignToAll } = req.body;

    let assignedStudents = [];

    // ASSIGN ALL STUDENTS

    if (assignToAll === "true") {
      const students = await User.find({
        role: "student",
      }).select("_id");

      assignedStudents = students.map((student) => student._id);
    }

    // SINGLE STUDENT
    else if (assignedTo) {
      assignedStudents = [assignedTo];
    }

    // CREATE HOMEWORK

    const homework = await Homework.create({
      title,

      description,

      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,

      createdBy: req.user._id,

      assignedTo: assignedStudents,

      deadline,
    });

    res.status(201).json({
      message: "Homework created successfully",

      homework,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHomework = async (req, res, next) => {
  try {
    let homework;

    if (req.user.role === "teacher") {
      homework = await Homework.find({ createdBy: req.user._id }).populate(
        "assignedTo",
        "name email",
      );
    } else {
      homework = await Homework.find({ assignedTo: req.user._id }).populate(
        "createdBy",
        "name email",
      );
    }

    res.status(200).json(homework);
  } catch (error) {
    next(error);
  }
};

export const getHomeworkById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const homework = await Homework.findById(id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("submissions.student", "name email");

    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }

    res.status(200).json(homework);
  } catch (error) {
    next(error);
  }
};

export const submitHomework = async (req, res, next) => {
  try {
    const { id } = req.params;
    const homework = await Homework.findById(id);

    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }

    const isAssigned = homework.assignedTo.some(
      (studentId) => studentId.toString() === req.user._id.toString(),
    );

    if (!isAssigned) {
      return res
        .status(403)
        .json({ message: "This homework is not assigned to you" });
    }

    const alreadySubmitted = homework.submissions.some(
      (s) => s.student.toString() === req.user._id.toString(),
    );

    if (alreadySubmitted) {
      return res
        .status(409)
        .json({ message: "You already submitted this homework" });
    }

    homework.submissions.push({
      student: req.user._id,

      submission: req.body.submission,

      submissionFile: req.file ? `/uploads/${req.file.filename}` : null,

      status: "submitted",
    });

    await homework.save();
    res.status(200).json({ message: "Homework submitted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { studentId, status } = req.body;
    const { id } = req.params;

    const homework = await Homework.findById(id);

    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }

    // make sure that the teacher who created it can review
    if (homework.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    console.log("SUBMISSIONS:", homework.submissions);
    console.log("REQUESTED studentId:", studentId);

    // find that specific student's submission inside the array
    const submission = homework.submissions.find(
      (s) => s.student.toString() === studentId,
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = status;
    await homework.save();

    res.status(200).json({ message: "Submission status updated", submission });
  } catch (error) {
    next(error);
  }
};

export const deleteHomework = async (req, res, next) => {
  try {
    const { id } = req.params;

    const homework = await Homework.findById(id);

    if (!homework) {
      return res.status(404).json({
        message: "Homework not found",
      });
    }

    if (homework.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await homework.deleteOne();

    res.status(200).json({
      message: "Homework deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

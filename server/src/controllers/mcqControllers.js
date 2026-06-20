import MCQ from "../models/MCQ.js";
import User from "../models/User.js";

export const createMCQ = async (req, res, next) => {
  try {
    const { title, description, questions, assignedTo, deadline } = req.body;

    let assignedStudents = [];

    if (assignedTo === "all") {
      const students = await User.find({
        role: "student",
      }).select("_id");

      assignedStudents = students.map((student) => student._id);
    } else if (assignedTo) {
      assignedStudents = [assignedTo];
    }

    const mcq = await MCQ.create({
      title,
      description,
      questions,
      createdBy: req.user._id,

      assignedTo: assignedStudents,

      deadline,
    });

    res.status(201).json({
      message: "MCQ created successfully",
      mcq,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMCQ = async (req, res, next) => {
  try {
    let mcqs;

    if (req.user.role === "teacher") {
      mcqs = await MCQ.find({
        createdBy: req.user._id,
      }).populate("assignedTo", "name email");
    } else {
      mcqs = await MCQ.find({
        assignedTo: req.user._id,
      }).populate("createdBy", "name email");
    }

    res.status(200).json(mcqs);
  } catch (error) {
    next(error);
  }
};

export const getMCQById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let mcq;

    // teacher can see answers
    if (req.user.role === "teacher") {
      mcq = await MCQ.findById(id)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");
    } else {
      mcq = await MCQ.findById(id).populate("createdBy", "name email");
    }

    if (!mcq) {
      return res.status(404).json({
        message: "MCQ not found",
      });
    }

    res.status(200).json(mcq);
  } catch (error) {
    next(error);
  }
};

export const updateMCQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, questions, assignedTo, deadline } = req.body;

    const mcq = await MCQ.findById(id);

    if (!mcq) {
      return res.status(404).json({ message: "MCQ not found" });
    }

    // only creator teacher can update
    if (mcq.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    mcq.title = title || mcq.title;
    mcq.description = description || mcq.description;
    mcq.questions = questions || mcq.questions;
    mcq.assignedTo = assignedTo || mcq.assignedTo;
    mcq.deadline = deadline || mcq.deadline;

    const updatedMCQ = await mcq.save();

    res.status(200).json({
      message: "MCQ updated successfully",
      updatedMCQ,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMCQ = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mcq = await MCQ.findById(id);

    if (!mcq) {
      return res.status(404).json({
        message: "MCQ not found",
      });
    }

    // only creator teacher can delete
    if (mcq.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await mcq.deleteOne();

    res.status(200).json({
      message: "MCQ deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

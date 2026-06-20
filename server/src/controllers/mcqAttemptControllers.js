import MCQ from "../models/MCQ.js";
import MCQAttempt from "../models/MCQAttempt.js";

export const attemptMCQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    // find mcq
    const mcq = await MCQ.findById(id);

    if (!mcq) {
      return res.status(404).json({
        message: "MCQ not found",
      });
    }

    // check if already attempted
    const alreadyAttempted = await MCQAttempt.findOne({
      mcq: id,
      student: req.user._id,
    });

    if (alreadyAttempted) {
      return res.status(400).json({
        message: "You already attempted this MCQ",
      });
    }

    // calculate here
    let score = 0;

    answers.forEach((answer) => {
      const question = mcq.questions[answer.questionIndex];

      if (question && question.correctAnswer === answer.selectedOption) {
        score++;
      }
    });

    // save attempted
    const attempt = await MCQAttempt.create({
      mcq: mcq._id,
      student: req.user._id,
      answers,
      score,
    });

    res.status(201).json({
      message: "MCQ submitted successfully",
      score,
      attempt,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await MCQAttempt.find({
      student: req.user._id,
    })
      .populate("mcq", "title description")
      .sort({ createdAt: -1 });

    res.status(200).json(attempts);
  } catch (error) {
    next(error);
  }
};

export const getMCQResults = async (req, res, next) => {
  try {
    const { id } = req.params;

    // find original mcq
    const mcq = await MCQ.findById(id);

    if (!mcq) {
      return res.status(404).json({
        message: "MCQ not found",
      });
    }

    // only creator teacher can view results
    if (mcq.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // get all attempts for this mcq
    const results = await MCQAttempt.find({
      mcq: id,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getAttemptById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let attempt;

    // teacher can see correct answers
    if (req.user.role === "teacher") {
      attempt = await MCQAttempt.findById(id)
        .populate("student", "name email")
        .populate("mcq", "title description questions");
    } else {
      // students should not see correct answers
      attempt = await MCQAttempt.findById(id)
        .populate("student", "name email")
        .populate({
          path: "mcq",
          select: "title description questions",
        });

      // remove correct answers manually
      if (attempt && attempt.mcq) {
        attempt.mcq.questions = attempt.mcq.questions.map((question) => ({
          _id: question._id,
          question: question.question,
          options: question.options,
        }));
      }
    }

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    res.status(200).json(attempt);
  } catch (error) {
    next(error);
  }
};

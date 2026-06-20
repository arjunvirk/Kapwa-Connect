import FillBlank from "../models/FillBlank.js";

// CREATE FILL BLANK QUESTION

export const createFillBlankQuestion = async (req, res) => {
  try {
    const { sentence, correctAnswer, options, difficulty } = req.body;

    if (!sentence || !correctAnswer) {
      return res.status(400).json({
        message: "Sentence and correct answer are required",
      });
    }

    const fillBlank = await FillBlank.create({
      sentence,
      correctAnswer,
      options,
      difficulty,
      createdBy: req.user._id,
    });

    res.status(201).json(fillBlank);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL QUESTIONS

export const getFillBlankQuestions = async (req, res) => {
  try {
    const questions = await FillBlank.find().sort({
      createdAt: -1,
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE QUESTION

export const getFillBlankQuestionById = async (req, res) => {
  try {
    const question = await FillBlank.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE QUESTION

export const updateFillBlankQuestion = async (req, res) => {
  try {
    const question = await FillBlank.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    question.sentence = req.body.sentence || question.sentence;

    question.correctAnswer = req.body.correctAnswer || question.correctAnswer;

    question.options = req.body.options || question.options;

    question.difficulty = req.body.difficulty || question.difficulty;

    const updatedQuestion = await question.save();

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE QUESTION

export const deleteFillBlankQuestion = async (req, res) => {
  try {
    const question = await FillBlank.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await question.deleteOne();

    res.json({
      message: "Fill blank question deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

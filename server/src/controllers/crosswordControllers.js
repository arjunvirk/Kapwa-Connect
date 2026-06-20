import Crossword from "../models/Crossword.js";

// CREATE CROSSWORD QUESTION

export const createCrosswordQuestion = async (req, res) => {
  try {
    const { question, answer, hint, difficulty } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required",
      });
    }

    const crossword = await Crossword.create({
      question,
      answer,
      hint,
      difficulty,
      createdBy: req.user._id,
    });

    res.status(201).json(crossword);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL CROSSWORD QUESTIONS

export const getCrosswordQuestions = async (req, res) => {
  try {
    const questions = await Crossword.find().sort({
      createdAt: -1,
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE CROSSWORD QUESTION

export const getCrosswordQuestionById = async (req, res) => {
  try {
    const question = await Crossword.findById(req.params.id);

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

// UPDATE CROSSWORD QUESTION

export const updateCrosswordQuestion = async (req, res) => {
  try {
    const question = await Crossword.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    question.question = req.body.question || question.question;

    question.answer = req.body.answer || question.answer;

    question.hint = req.body.hint || question.hint;

    question.difficulty = req.body.difficulty || question.difficulty;

    const updatedQuestion = await question.save();

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CROSSWORD QUESTION

export const deleteCrosswordQuestion = async (req, res) => {
  try {
    const question = await Crossword.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await question.deleteOne();

    res.json({
      message: "Crossword question deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

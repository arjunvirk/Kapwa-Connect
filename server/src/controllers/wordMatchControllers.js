import WordMatch from "../models/WordMatch.js";

// CREATE WORD MATCH QUESTION

export const createWordMatchQuestion = async (req, res) => {
  try {
    const { title, pairs, difficulty } = req.body;

    // VALIDATION

    if (!title || !pairs || pairs.length === 0) {
      return res.status(400).json({
        message: "Title and word pairs are required",
      });
    }

    // CHECK EMPTY PAIRS

    const invalidPair = pairs.find((pair) => !pair.tagalog || !pair.english);

    if (invalidPair) {
      return res.status(400).json({
        message: "All word pairs must be filled",
      });
    }

    // CREATE GAME

    const wordMatch = await WordMatch.create({
      title,
      pairs,
      difficulty,
      createdBy: req.user._id,
    });

    res.status(201).json(wordMatch);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL WORD MATCH QUESTIONS

export const getWordMatchQuestions = async (req, res) => {
  try {
    const questions = await WordMatch.find().sort({
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

export const getWordMatchQuestionById = async (req, res) => {
  try {
    const question = await WordMatch.findById(req.params.id);

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

export const updateWordMatchQuestion = async (req, res) => {
  try {
    const question = await WordMatch.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    question.tagalogWord = req.body.tagalogWord || question.tagalogWord;

    question.englishMeaning =
      req.body.englishMeaning || question.englishMeaning;

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

export const deleteWordMatchQuestion = async (req, res) => {
  try {
    const question = await WordMatch.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await question.deleteOne();

    res.json({
      message: "Word match question deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

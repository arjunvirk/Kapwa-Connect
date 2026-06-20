import express from "express";

const router = express.Router();

import {
  createWordMatchQuestion,
  getWordMatchQuestions,
  getWordMatchQuestionById,
  updateWordMatchQuestion,
  deleteWordMatchQuestion,
} from "../controllers/wordMatchControllers.js";

import  protect  from "../middlewares/authMiddleware.js";

import { requireRole } from "../middlewares/role.js";

// GET ALL QUESTIONS + CREATE QUESTION

router
  .route("/")
  .get(getWordMatchQuestions)
  .post(protect, requireRole("teacher"), createWordMatchQuestion);

// GET SINGLE + UPDATE + DELETE

router
  .route("/:id")
  .get(getWordMatchQuestionById)
  .put(protect, requireRole("teacher"), updateWordMatchQuestion)
  .delete(protect, requireRole("teacher"), deleteWordMatchQuestion);

export default router;

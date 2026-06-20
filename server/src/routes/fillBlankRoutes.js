import express from "express";

const router = express.Router();

import {
  createFillBlankQuestion,
  getFillBlankQuestions,
  getFillBlankQuestionById,
  updateFillBlankQuestion,
  deleteFillBlankQuestion,
} from "../controllers/fillBlankControllers.js";

import protect  from "../middlewares/authMiddleware.js";

import { requireRole } from "../middlewares/role.js";

// GET ALL QUESTIONS + CREATE QUESTION

router
  .route("/")
  .get(getFillBlankQuestions)
  .post(protect, requireRole("teacher"), createFillBlankQuestion);

// GET SINGLE + UPDATE + DELETE

router
  .route("/:id")
  .get(getFillBlankQuestionById)
  .put(protect, requireRole("teacher"), updateFillBlankQuestion)
  .delete(protect, requireRole("teacher"), deleteFillBlankQuestion);

export default router;

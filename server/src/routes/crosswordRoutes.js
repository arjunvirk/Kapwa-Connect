import express from "express";

const router = express.Router();

import {
  createCrosswordQuestion,
  getCrosswordQuestions,
  getCrosswordQuestionById,
  updateCrosswordQuestion,
  deleteCrosswordQuestion,
} from "../controllers/crosswordControllers.js";

import protect  from "../middlewares/authMiddleware.js";

import { requireRole } from "../middlewares/role.js";

// GET ALL QUESTIONS + CREATE QUESTION

router
  .route("/")
  .get(getCrosswordQuestions)
  .post(protect, requireRole("teacher"), createCrosswordQuestion);

// GET SINGLE + UPDATE + DELETE

router
  .route("/:id")
  .get(getCrosswordQuestionById)
  .put(protect, requireRole("teacher"), updateCrosswordQuestion)
  .delete(protect, requireRole("teacher"), deleteCrosswordQuestion);

export default router;

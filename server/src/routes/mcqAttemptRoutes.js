import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/role.js";
import {
  attemptMCQ,
  getAttemptById,
  getMCQResults,
  getMyAttempts,
} from "../controllers/mcqAttemptControllers.js";

// student attempts mcq
router.post("/:id/attempt", protect, requireRole("student"), attemptMCQ);

// student gets own attempts
router.get("/my-attempts", protect, requireRole("student"), getMyAttempts);

// teacher gets all result of one mcq
router.get("/:id/results", protect, requireRole("teacher"), getMCQResults);

// get single attempt details
router.get("/attempt/:id", protect, getAttemptById);

export default router;

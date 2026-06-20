import express from "express";
const router = express.Router();

import {
  createLiveSession,
  getTeacherSessions,
  getStudentSessions,
  getSingleSession,
  updateSessionStatus,
  deleteLiveSession,
  updateMeetingLink,
} from "../controllers/liveSessionControllers.js";

import protect from "../middlewares/authMiddleware.js";

// Create Live Session

router.post("/", protect, createLiveSession);

// GET ALL TEACHER SESSIONS
router.get("/teacher", protect, getTeacherSessions);

// GET ALL STUDENT SESSIONS
router.get("/student", protect, getStudentSessions);

// GET SINGLE SESSION
router.get("/:id", protect, getSingleSession);

// UPDATE SESSION STATUS
router.put("/:id/status", protect, updateSessionStatus);

router.put("/:id/meeting-link", protect, updateMeetingLink);

// DELETE SESSION
router.delete("/:id", protect, deleteLiveSession);

export default router;
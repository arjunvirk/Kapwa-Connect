import express from "express";
import {
  authUser,
  deleteStudent,
  getStudentById,
  getStudents,
  getUserProfile,
  logoutUser,
  registerUser,
  updateStudent,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  verifyEmail,
  checkVerificationStatus,
} from "../controllers/userControllers.js";
import { googleAuth } from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/role.js";
const router = express.Router();

router.get("/verify-email/:token", verifyEmail);

router.get("/check-verification", checkVerificationStatus);

router.post("/", registerUser);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.get("/students", protect, requireRole("teacher"), getStudents);

router.get("/:id", protect, requireRole("teacher"), getStudentById);

router.put("/:id", protect, requireRole("teacher"), updateStudent);

router.delete("/:id", protect, requireRole("teacher"), deleteStudent);

router.post("/google-auth", googleAuth);

export default router;

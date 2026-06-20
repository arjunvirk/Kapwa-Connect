import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/role.js";
import { upload } from "../config/multer.js";
import {
  createHomework,
  deleteHomework,
  getAllHomework,
  getHomeworkById,
  submitHomework,
  updateSubmissionStatus,
} from "../controllers/homeworkControllers.js";
const router = express.Router();

router.post(
  "/",
  protect,
  requireRole("teacher"),
  upload.single("file"),
  createHomework,
);
router.get("/", protect, getAllHomework);
router.get("/:id", protect, getHomeworkById);
router.post(
  "/:id/submit",
  protect,
  requireRole("student"),
  upload.single("file"),
  submitHomework,
);
router.patch(
  "/:id/review",
  protect,
  requireRole("teacher"),
  updateSubmissionStatus,
);
router.delete("/:id", protect, requireRole("teacher"), deleteHomework);
export default router;

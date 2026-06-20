import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/role.js";
import {
  createMCQ,
  deleteMCQ,
  getAllMCQ,
  getMCQById,
  updateMCQ,
} from "../controllers/mcqControllers.js";

const router = express.Router();

router.post("/", protect, requireRole("teacher"), createMCQ);

router.get("/", protect, getAllMCQ);

router.get("/:id", protect, getMCQById);

router.put("/:id", protect, requireRole("teacher"), updateMCQ);

router.delete("/:id", protect, requireRole("teacher"), deleteMCQ);

export default router;

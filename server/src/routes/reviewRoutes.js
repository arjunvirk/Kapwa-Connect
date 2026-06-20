import express from "express";

const router = express.Router();

import protect from "../middlewares/authMiddleware.js";

import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
  getMyReview,
} from "../controllers/reviewControllers.js";

// STUDENT CREATE REVIEW

router.post("/", protect, createReview);

// HOMEPAGE REVIEWS

router.get("/", getApprovedReviews);

// TEACHER GET ALL REVIEWS

router.get("/all", protect, getAllReviews);

// APPROVE REVIEW

router.put("/:id/approve", protect, approveReview);

// DELETE REVIEW

router.delete("/:id", protect, deleteReview);

router.get("/my-review", protect, getMyReview);

export default router;

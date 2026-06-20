import Review from "../models/Review.js";

// CREATE REVIEW

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const alreadyReviewed = await Review.findOne({
      student: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review",
      });
    }

    const review = await Review.create({
      student: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET APPROVED REVIEWS (Homepage)

export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      approved: true,
    })
      .populate("student", "name")
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL REVIEWS (Teacher)

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// APPROVE REVIEW

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.approved = true;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review approved successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE REVIEW

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      student: req.user._id,
    });

    res.status(200).json({
      success: true,
      hasReviewed: !!review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";

import { toast } from "sonner";

import { createReview } from "../actions/reviewActions";

import { REVIEW_CREATE_RESET } from "../constants/reviewConstants";

const StudentReview = () => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const reviewCreate = useSelector(
    (state) => state.reviewCreate,
  );

  const { loading, error, success } = reviewCreate;

  useEffect(() => {
    if (success) {
      toast.success(
        "Review submitted successfully. Waiting for approval.",
      );

      setRating(0);

      setComment("");

      dispatch({
        type: REVIEW_CREATE_RESET,
      });
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (rating === 0) {
      return toast.error("Please select a rating");
    }

    dispatch(
      createReview({
        rating,
        comment,
      }),
    );
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium text-gray-500">
            Student Feedback
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Leave A Review
          </h1>

          <p className="mt-4 text-gray-600">
            Share your learning experience and help future
            students learn Tagalog with confidence.
          </p>
        </div>

        {/* Card */}

        <form
          onSubmit={submitHandler}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >
          {/* Rating */}

          <div className="mb-8">
            <label className="mb-4 block text-lg font-semibold">
              Rate Your Experience
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={34}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Selected Rating: {rating}/5
            </p>
          </div>

          {/* Review */}

          <div className="mb-8">
            <label className="mb-3 block text-lg font-semibold">
              Your Review
            </label>

            <textarea
              rows="6"
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Share your learning experience..."
              className="w-full rounded-2xl border p-4 outline-none focus:ring-2"
              required
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black px-6 py-4 text-white transition hover:opacity-90"
          >
            {loading
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default StudentReview;
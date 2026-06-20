import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";

import {
  getAllReviews,
  approveReview,
  deleteReview,
} from "../actions/reviewActions";

import { toast } from "sonner";

const TeacherReviews = () => {
  const dispatch = useDispatch();

  const reviewAll = useSelector((state) => state.reviewAll);

  const { loading, error, reviews } = reviewAll;

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const approveHandler = (id) => {
    dispatch(approveReview(id));

    toast.success("Review approved");

    setTimeout(() => {
      dispatch(getAllReviews());
    }, 500);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Delete this review?")) {
      dispatch(deleteReview(id));

      toast.success("Review deleted");

      setTimeout(() => {
        dispatch(getAllReviews());
      }, 500);
    }
  };

  console.log(reviews);
  console.log(error);
  console.log(loading);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Student Reviews</h1>

          <p className="mt-3 text-gray-600">
            Manage and approve student testimonials.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border p-5">Loading reviews...</div>
        )}

        {/* Empty */}

        {!loading && reviews?.length === 0 && (
          <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">No Reviews Yet</h3>

            <p className="mt-3 text-gray-500">
              Student reviews will appear here.
            </p>
          </div>
        )}

        {/* Reviews */}

        <div className="space-y-5">
          {reviews?.map((review) => (
            <div key={review._id} className="rounded-3xl border p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {review.student?.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {review.student?.email}
                  </p>

                  {/* Stars */}

                  <div className="mt-4 flex gap-1">
                    {[...Array(review.rating)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-400" />
                    ))}
                  </div>

                  {/* Review */}

                  <p className="mt-4 max-w-2xl leading-7 text-gray-700">
                    "{review.comment}"
                  </p>

                  <div className="mt-4">
                    {review.approved ? (
                      <span className="rounded-full border border-green-500 px-4 py-2 text-sm text-green-600">
                        Approved
                      </span>
                    ) : (
                      <span className="rounded-full border border-yellow-500 px-4 py-2 text-sm text-yellow-600">
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}

                <div className="flex flex-col gap-3">
                  {!review.approved && (
                    <button
                      onClick={() => approveHandler(review._id)}
                      className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => deleteHandler(review._id)}
                    className="rounded-xl border border-red-500 px-5 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherReviews;

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";

import { getApprovedReviews } from "../actions/reviewActions";

const Testimonial = () => {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);

  const { reviews = [] } = reviewList;

  useEffect(() => {
    dispatch(getApprovedReviews());
  }, [dispatch]);

  return (
    <section className="bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium text-gray-500">
            Student Testimonials
          </p>

          <h2 className="text-3xl font-bold md:text-5xl">
            What Students Say
            <br />
            About The Mentor
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Real reviews from students learning Tagalog through Kapwa Connect.
          </p>
        </div>

        {/* Empty State */}

        {reviews.length === 0 && (
          <div className="rounded-3xl border bg-white p-10 text-center">
            <h3 className="text-2xl font-semibold">No Reviews Available Yet</h3>

            <p className="mt-3 text-gray-500">
              Approved student reviews will appear here.
            </p>
          </div>
        )}

        {/* Reviews */}

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-sm"
            >
              {/* User */}

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border text-lg font-semibold">
                  {review.student?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {review.student?.name}
                  </h3>

                  <p className="text-sm text-gray-500">Verified Student</p>
                </div>
              </div>

              {/* Stars */}

              <div className="mb-4 flex gap-1">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400" />
                ))}
              </div>

              {/* Review */}

              <p className="leading-7 text-gray-600">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { getHomeworkDetails, submitHomework } from "../actions/homeworkActions";

const StudentHomeworkDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // HOMEWORK DETAILS

  const homeworkDetails = useSelector((state) => state.homeworkDetails);

  const { loading, error, homework } = homeworkDetails;

  // USER LOGIN

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  // SUBMIT STATE

  const homeworkSubmit = useSelector((state) => state.homeworkSubmit);

  const {
    loading: submitLoading,
    error: submitError,
    success: submitSuccess,
  } = homeworkSubmit;

  // FORM STATES

  const [submission, setSubmission] = useState("");

  const [file, setFile] = useState(null);

  // FETCH HOMEWORK

  useEffect(() => {
    dispatch(getHomeworkDetails(id));
  }, [dispatch, id, submitSuccess]);

  // CHECK ALREADY SUBMITTED

  const alreadySubmitted = homework?.submissions?.some(
    (submissionItem) =>
      submissionItem.student?._id === userInfo?._id ||
      submissionItem.student === userInfo?._id,
  );

  // SUBMIT HANDLER

  const submitHandler = (e) => {
    e.preventDefault();

    if (alreadySubmitted) return;

    const formData = new FormData();

    formData.append("submission", submission);

    if (file) {
      formData.append("file", file);
    }

    dispatch(submitHomework(id, formData));
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Back */}

        <div className="mb-6">
          <Link
            to="/student/homework"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            ← Back to Homework
          </Link>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading homework...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Submit Error */}

        {submitError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {submitError}
          </div>
        )}

        {/* Submit Success */}

        {submitSuccess && (
          <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            Homework submitted successfully
          </div>
        )}

        {/* Content */}

        {!loading && !error && homework && (
          <div className="rounded-3xl border p-8 shadow-sm">
            {/* Top */}

            <div className="mb-8 border-b pb-6">
              <div className="mb-5 flex items-start justify-between gap-5">
                <div>
                  <h1 className="text-4xl font-bold">{homework.title}</h1>

                  <p className="mt-4 text-gray-600">
                    Created by {homework?.createdBy?.name}
                  </p>
                </div>

                {homework.deadline && (
                  <span className="rounded-full border px-4 py-2 text-sm">
                    Due {new Date(homework.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Description */}

              <p className="leading-8 text-gray-700">{homework.description}</p>

              {/* Attachment */}

              {homework.fileUrl && (
                <a
                  href={`${import.meta.env.VITE_API_URL}${homework.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-sm font-medium underline"
                >
                  Download Attachment
                </a>
              )}
            </div>

            {/* Submission */}

            <div>
              <h2 className="text-2xl font-semibold">Submit Homework</h2>

              <p className="mt-2 text-sm text-gray-500">
                Write your answer or upload homework files.
              </p>

              {/* Already Submitted */}

              {alreadySubmitted && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  You already submitted this homework.
                </div>
              )}

              {/* Form */}

              <form onSubmit={submitHandler} className="mt-6 space-y-5">
                {/* Text */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Written Answer
                  </label>

                  <textarea
                    rows="8"
                    placeholder="Write your homework submission..."
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    disabled={alreadySubmitted}
                    className="w-full rounded-2xl border px-4 py-4 outline-none focus:border-black disabled:bg-gray-100"
                  ></textarea>
                </div>

                {/* File Upload */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Upload File
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={alreadySubmitted}
                    className="w-full rounded-xl border px-4 py-3 disabled:bg-gray-100"
                  />
                </div>

                {/* Submit Button */}

                <button
                  type="submit"
                  disabled={alreadySubmitted || submitLoading}
                  className={`rounded-xl px-6 py-3 text-white transition ${
                    alreadySubmitted || submitLoading
                      ? "cursor-not-allowed bg-gray-400"
                      : "cursor-pointer bg-black hover:opacity-90"
                  }`}
                >
                  {alreadySubmitted
                    ? "Already Submitted"
                    : submitLoading
                      ? "Submitting..."
                      : "Submit Homework"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentHomeworkDetails;

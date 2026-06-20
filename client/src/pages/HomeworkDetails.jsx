import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";

import { getHomeworkDetails } from "../actions/homeworkActions";

const HomeworkDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const homeworkDetails = useSelector((state) => state.homeworkDetails);

  const { loading, error, homework } = homeworkDetails;

  useEffect(() => {
    dispatch(getHomeworkDetails(id));
  }, [dispatch, id]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading homework details...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Content */}

        {!loading && !error && homework && (
          <>
            {/* Top Section */}

            <div className="rounded-3xl border p-8 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold">{homework.title}</h1>

                  <p className="mt-3 text-gray-600">
                    Homework details and student submissions.
                  </p>
                </div>

                {homework.deadline && (
                  <span className="rounded-full border px-4 py-2 text-sm">
                    Deadline: {new Date(homework.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Description */}

              <div className="rounded-2xl bg-gray-50 p-5">
                <h2 className="mb-3 text-lg font-semibold">Description</h2>

                <p className="leading-7 text-gray-700">
                  {homework.description}
                </p>
              </div>

              {/* Attachment */}

              {homework.fileUrl && (
                <div className="mt-6">
                  <a
                    href={`${import.meta.env.VITE_API_URL}${homework.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
                  >
                    View Attachment
                  </a>
                </div>
              )}
            </div>

            {/* Assigned Students */}

            <div className="mt-10 rounded-3xl border p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Assigned Students</h2>

                <p className="mt-2 text-sm text-gray-500">
                  Students assigned to this homework.
                </p>
              </div>

              {homework.assignedTo?.length === 0 ? (
                <p className="text-gray-500">No students assigned.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {homework.assignedTo?.map((student) => (
                    <div
                      key={student._id}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <h3 className="font-medium">{student.name}</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {student.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submissions */}

            <div className="mt-10 rounded-3xl border p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Student Submissions</h2>

                <p className="mt-2 text-sm text-gray-500">
                  Review homework submissions.
                </p>
              </div>

              {homework.submissions?.length === 0 ? (
                <p className="text-gray-500">No submissions yet.</p>
              ) : (
                <div className="space-y-4">
                  {homework.submissions?.map((submission) => (
                    <div
                      key={submission._id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gray-50 p-5"
                    >
                      <div>
                        <h3 className="font-medium">
                          {submission.student?.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {submission.student?.email}
                        </p>

                        {submission.submission && (
                          <p className="mt-3 text-sm leading-6 text-gray-700">
                            {submission.submission}
                          </p>
                        )}

                        {submission.submissionFile && (
                          <a
                            href={`${import.meta.env.VITE_API_URL}${submission.submissionFile}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block rounded-xl border px-4 py-2 text-sm transition hover:bg-black hover:text-white"
                          >
                            View Submission File
                          </a>
                        )}
                      </div>

                      <span className="rounded-full border px-4 py-2 text-sm capitalize">
                        {submission.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Back Button */}

            <div className="mt-8">
              <Link
                to="/teacher/homework"
                className="inline-block rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                Back to Homework
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeworkDetails;

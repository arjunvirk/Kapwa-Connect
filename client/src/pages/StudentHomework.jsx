import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { listHomework } from "../actions/homeworkActions";

const StudentHomework = () => {
  const dispatch = useDispatch();

  const homeworkList = useSelector((state) => state.homeworkList);

  const { loading, error, homeworks } = homeworkList;

  useEffect(() => {
    dispatch(listHomework());
  }, [dispatch]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Back */}

        <div className="mb-6">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">My Homework</h1>

          <p className="mt-3 text-gray-600">
            View all assigned homework and complete your tasks on time.
          </p>
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

        {/* Empty */}

        {!loading && !error && homeworks?.length === 0 && (
          <div className="rounded-3xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">No Homework Assigned</h2>

            <p className="mt-3 text-gray-500">
              Homework assigned by your teacher will appear here.
            </p>
          </div>
        )}

        {/* Homework Grid */}

        {!loading && !error && homeworks?.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeworks.map((homework) => (
              <div
                key={homework._id}
                className="rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-sm"
              >
                {/* Top */}

                <div className="mb-4 flex items-start justify-between">
                  <span className="rounded-full border px-3 py-1 text-xs">
                    Homework
                  </span>

                  {homework.deadline && (
                    <span className="text-sm text-gray-500">
                      {new Date(homework.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Title */}

                <h2 className="text-2xl font-semibold">{homework.title}</h2>

                {/* Description */}

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {homework.description}
                </p>

                {/* File */}

                {homework.fileUrl && (
                  <a
                    href={`${import.meta.env.VITE_API_URL}${homework.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-sm font-medium underline"
                  >
                    View Attachment
                  </a>
                )}

                {/* Footer */}

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-gray-500">Assigned</p>

                  <Link
                    to={`/student/homework/${homework._id}`}
                    className="text-sm font-medium"
                  >
                    Open Homework
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentHomework;

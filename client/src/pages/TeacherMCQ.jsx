import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { deleteMCQ, listMCQ } from "../actions/mcqActions";

const TeacherMCQ = () => {
  const dispatch = useDispatch();

  const mcqList = useSelector((state) => state.mcqList);

  const { loading, error, mcqs } = mcqList;

  const mcqDelete = useSelector((state) => state.mcqDelete);

  const { success: successDelete } = mcqDelete;

  useEffect(() => {
    dispatch(listMCQ());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this MCQ?",
    );

    if (confirmDelete) {
      dispatch(deleteMCQ(id));
    }
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">MCQ Tests</h1>

            <p className="mt-3 text-gray-600">
              View and manage all created quizzes and tests.
            </p>
          </div>

          <Link
            to="/teacher/mcq/create"
            className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
          >
            Create MCQ
          </Link>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading MCQs...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && mcqs?.length === 0 && (
          <div className="rounded-3xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">No MCQs Yet</h2>

            <p className="mt-3 text-gray-500">
              Start by creating your first quiz or vocabulary test.
            </p>
          </div>
        )}

        {/* MCQ List */}

        {!loading && !error && mcqs?.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {mcqs.map((mcq) => (
              <div
                key={mcq._id}
                className="rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-sm"
              >
                {/* Top */}

                <div className="mb-4 flex items-start justify-between">
                  <span className="rounded-full border px-3 py-1 text-xs">
                    MCQ Test
                  </span>

                  {mcq.deadline && (
                    <span className="text-sm text-gray-500">
                      {new Date(mcq.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Title */}

                <h2 className="text-2xl font-semibold">{mcq.title}</h2>

                {/* Description */}

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {mcq.description}
                </p>

                {/* Questions Count */}

                <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Questions</p>

                  <h3 className="mt-1 text-2xl font-semibold">
                    {mcq.questions?.length}
                  </h3>
                </div>

                {/* Footer */}

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <Link
                    to={`/teacher/mcq/${mcq._id}`}
                    className="text-sm font-medium"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => deleteHandler(mcq._id)}
                    className="text-sm font-medium text-red-500 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherMCQ;

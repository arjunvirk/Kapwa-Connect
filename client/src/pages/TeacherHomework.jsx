import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { deleteHomework, listHomework } from "../actions/homeworkActions";
import { toast } from "sonner";

const TeacherHomework = () => {
  const dispatch = useDispatch();

  const homeworkList = useSelector((state) => state.homeworkList);

  const { loading, error, homeworks } = homeworkList;

  const homeworkDelete = useSelector((state) => state.homeworkDelete);

  const { success: successDelete } = homeworkDelete;

  useEffect(() => {
    dispatch(listHomework());
  }, [dispatch, successDelete]);

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this homework?",
    );

    if (confirmDelete) {
      const toastId = toast.loading("Deleting homework...");

      await dispatch(deleteHomework(id));

      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (successDelete) {
      toast.success("Homework deleted successfully");
    }

    if (error) {
      toast.error(error);
    }
  }, [successDelete, error]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Homework</h1>

            <p className="mt-3 text-gray-600">
              View and manage all created homework assignments.
            </p>
          </div>

          <Link
            to="/teacher/homework/create"
            className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
          >
            Create Homework
          </Link>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading homework...
          </div>
        )}

        {/* Empty */}

        {!loading && !error && homeworks?.length === 0 && (
          <div className="rounded-3xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">No Homework Yet</h2>

            <p className="mt-3 text-gray-500">
              Start by creating your first homework assignment.
            </p>
          </div>
        )}

        {/* Homework List */}

        {!loading && !error && homeworks?.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeworks.map((homework) => (
              <div
                key={homework._id}
                className="rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-sm"
              >
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

                <h2 className="text-2xl font-semibold">{homework.title}</h2>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {homework.description}
                </p>

                {/* File */}

                {homework.fileUrl && (
                  <a
                    href={`${import.meta.env.VITE_API_URL}${homework.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-medium underline"
                  >
                    View Attachment
                  </a>
                )}

                {/* Footer */}

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-gray-500">
                    {homework.submissions?.length} submissions
                  </p>

                  <div className="flex items-center gap-4">
                    <Link
                      to={`/teacher/homework/${homework._id}`}
                      className="rounded-lg px-3 py-1 text-sm font-medium transition hover:bg-black hover:text-white"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => deleteHandler(homework._id)}
                      className="cursor-pointer rounded-lg px-3 py-1 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherHomework;

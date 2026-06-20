import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { deleteStudent, getStudents } from "../actions/userActions";

import { Link } from "react-router-dom";

import { toast } from "sonner";

const ViewStudents = () => {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);

  const { loading, error, students } = studentList;

  const userDelete = useSelector((state) => state.userDelete);

  const { success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (confirmDelete) {
      dispatch(deleteStudent(id));

      toast.loading("Removing student...");
    }
  };

  useEffect(() => {
    if (successDelete) {
      toast.success("Student deleted successfully");
    }

    if (error) {
      toast.error(error);
    }
  }, [successDelete, error]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Students</h1>

          <p className="mt-3 text-gray-600">
            Manage and monitor all registered students.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Fetching registered students...
          </div>
        )}

        {/* Empty */}

        {!loading && !error && students?.length === 0 && (
          <div className="rounded-3xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">No Students Found</h2>

            <p className="mt-3 text-gray-500">
              Students will appear here once they register.
            </p>
          </div>
        )}

        {/* Students Grid */}

        {!loading && !error && students?.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {students.map((student) => (
              <div
                key={student._id}
                className="rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Top */}

                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full border px-3 py-1 text-xs">
                    Student
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    Active
                  </span>
                </div>

                {/* Name */}

                <h2 className="wrap-break-word text-2xl font-semibold">
                  {student.name}
                </h2>

                {/* Email */}

                <p className="mt-3 break-all text-sm text-gray-600">
                  {student.email}
                </p>

                {/* Stats */}

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Homework</p>

                    <h3 className="mt-1 text-2xl font-semibold">0</h3>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">MCQs</p>

                    <h3 className="mt-1 text-2xl font-semibold">0</h3>
                  </div>
                </div>

                {/* Footer */}

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <Link
                    to={`/teacher/students/${student._id}`}
                    className="rounded-lg px-3 py-1 text-sm font-medium transition hover:bg-black hover:text-white"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={() => deleteHandler(student._id)}
                    className="cursor-pointer rounded-lg px-3 py-1 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
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

export default ViewStudents;

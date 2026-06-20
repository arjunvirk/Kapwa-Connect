import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import {
  getStudentDetails,
  updateStudentDetails,
} from "../actions/userActions";

import { toast } from "sonner";

const StudentDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // STUDENT DETAILS

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  // UPDATE STUDENT

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate;

  // STATES

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  // FETCH STUDENT

  useEffect(() => {
    dispatch(getStudentDetails(id));
  }, [dispatch, id]);

  // SET DATA

  useEffect(() => {
    if (user) {
      setName(user.name || "");

      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Student updated successfully");
    }

    if (error) {
      toast.error(error);
    }

    if (updateError) {
      toast.error(updateError);
    }
  }, [updateSuccess, error, updateError]);

  // SUBMIT

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    dispatch(
      updateStudentDetails(id, {
        name,
        email,
      }),
    );
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            to="/teacher/students"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            ← Back to Students
          </Link>
        </div>
        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Fetching student profile...
          </div>
        )}

        {/* Content */}

        {!loading && !error && user && (
          <div className="rounded-3xl border p-8 shadow-sm transition duration-300 hover:shadow-xl">
            {/* Heading */}

            <div className="mb-8">
              <h1 className="text-4xl font-bold">Student Profile</h1>

              <p className="mt-3 text-gray-600">
                Manage student account details.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Role */}

              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>

                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3 outline-none"
                />
              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={updateLoading}
                className="w-full cursor-pointer rounded-xl bg-black py-3 text-white transition duration-300 hover:scale-[1.01] hover:opacity-90 disabled:opacity-70"
              >
                {updateLoading ? "Saving Changes..." : "Update Student"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentDetails;

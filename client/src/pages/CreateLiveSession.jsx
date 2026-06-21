import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createLiveSession } from "../actions/liveSessionActions";

import { getStudents } from "../actions/userActions";

import { LIVE_SESSION_CREATE_RESET } from "../constants/liveSessionConstants";

const CreateLiveSession = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [student, setStudent] = useState("");

  const [scheduledAt, setScheduledAt] = useState("");

  // STUDENTS

  const studentList = useSelector((state) => state.studentList);

  const { students } = studentList;

  // LIVE SESSION CREATE

  const liveSessionCreate = useSelector((state) => state.liveSessionCreate);

  const { loading, error, success } = liveSessionCreate;

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch({
        type: LIVE_SESSION_CREATE_RESET,
      });

      navigate("/teacher/live-sessions");
    }
  }, [success, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createLiveSession({
        title,
        student,
        scheduledAt,
      }),
    );
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Create Live Session</h1>

          <p className="mt-3 text-gray-600">
            Schedule a 1-on-1 live class session.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={submitHandler} className="rounded-3xl border p-8">
          {/* Error */}

          {error && (
            <div className="mb-5 rounded-xl bg-red-100 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Title */}

          <div className="mb-6">
            <label className="mb-2 block font-medium">Session Title</label>

            <input
              type="text"
              placeholder="Enter session title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border p-4 outline-none focus:ring-2"
              required
            />
          </div>

          {/* Student */}

          <div className="mb-6">
            <label className="mb-2 block font-medium">Select Student</label>

            <select
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="w-full rounded-2xl border p-4 outline-none focus:ring-2"
              required
            >
              <option value="">Choose Student</option>

              {students?.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Time */}

          <div className="mb-8">
            <label className="mb-2 block font-medium">
              Schedule Date & Time
            </label>

            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full rounded-2xl border p-4 outline-none focus:ring-2"
              required
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black px-5 py-4 text-white transition hover:opacity-90 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Live Session"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateLiveSession;

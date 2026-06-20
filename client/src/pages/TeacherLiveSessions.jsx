import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  getTeacherLiveSessions,
  deleteLiveSession,
} from "../actions/liveSessionActions";

import { toast } from "sonner";

const TeacherLiveSessions = () => {
  const dispatch = useDispatch();

  // TEACHER LIVE SESSIONS

  const teacherLiveSessions = useSelector((state) => state.teacherLiveSessions);

  const { loading, error, sessions } = teacherLiveSessions;

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this live session?")) {
      await dispatch(deleteLiveSession(id));

      toast.success("Session deleted");

      dispatch(getTeacherLiveSessions());
    }
  };

  useEffect(() => {
    dispatch(getTeacherLiveSessions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Live Sessions</h1>

            <p className="mt-3 text-gray-600">
              Schedule and manage 1-on-1 live classes.
            </p>
          </div>

          <Link
            to="/teacher/live-sessions/create"
            className="w-full rounded-2xl bg-black px-5 py-3 text-center text-white transition hover:opacity-90 md:w-auto"
          >
            Create Session
          </Link>
        </div>

        {/* Sessions */}

        <div className="rounded-3xl border p-5 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Upcoming Sessions</h2>

            <p className="mt-2 text-sm text-gray-500">
              Your scheduled live classes will appear here.
            </p>
          </div>

          {/* Loading */}

          {loading && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-500">
              Fetching live sessions...
            </div>
          )}

          {/* Empty State */}

          {!loading && sessions?.length === 0 && (
            <div className="rounded-2xl bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-semibold">No live sessions yet</h3>

              <p className="mt-2 text-sm text-gray-500">
                Create your first 1-on-1 live class session.
              </p>
            </div>
          )}

          {/* Sessions List */}

          <div className="space-y-4">
            {sessions?.map((session) => (
              <div
                key={session._id}
                className="rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  {/* Left Content */}

                  <div>
                    <h3 className="wrap-break-word text-xl font-semibold">
                      {session.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Student: {session.student?.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(session.scheduledAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Right Content */}

                  <div className="flex flex-col gap-3 md:items-end">
                    <span className="rounded-full border px-4 py-2 text-center text-sm capitalize">
                      {session.status}
                    </span>

                    {session.meetingLink && (
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-black px-5 py-3 text-center text-sm text-white"
                      >
                        Open Google Meet
                      </a>
                    )}

                    <button
                      onClick={() => deleteHandler(session._id)}
                      className="rounded-xl border border-red-500 px-5 py-3 text-sm cursor-pointer text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherLiveSessions;

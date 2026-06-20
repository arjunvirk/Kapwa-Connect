import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentLiveSessions } from "../actions/liveSessionActions";

const StudentLiveSessions = () => {
  const dispatch = useDispatch();

  // STUDENT LIVE SESSIONS

  const studentLiveSessions = useSelector((state) => state.studentLiveSessions);

  const { loading, error, sessions } = studentLiveSessions;

  useEffect(() => {
    dispatch(getStudentLiveSessions());
  }, [dispatch]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Live Sessions</h1>

          <p className="mt-3 text-gray-600">
            Join your scheduled live classes.
          </p>
        </div>

        {/* Sessions */}

        <div className="rounded-3xl border p-5 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Upcoming Sessions</h2>

            <p className="mt-2 text-sm text-gray-500">
              Your assigned live sessions will appear here.
            </p>
          </div>

          {/* Loading */}

          {loading && <p className="text-gray-500">Loading sessions...</p>}

          {/* Error */}

          {error && <p className="text-red-500">{error}</p>}

          {/* Empty State */}

          {!loading && sessions?.length === 0 && (
            <div className="rounded-2xl bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-semibold">No live sessions yet</h3>

              <p className="mt-2 text-sm text-gray-500">
                Your teacher has not scheduled any live sessions yet.
              </p>
            </div>
          )}

          {/* Sessions List */}

          <div className="space-y-4">
            {sessions?.map((session) => {
              const now = new Date();

              const startTime = new Date(session.scheduledAt);

              const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

              const canJoin =
                now >= new Date(startTime.getTime() - 10 * 60 * 1000) &&
                now <= endTime;

              return (
                <div key={session._id} className="rounded-2xl border p-5">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Left Content */}

                    <div>
                      <h3 className="text-xl font-semibold wrap-break-word">
                        {session.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Teacher: {session.teacher?.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(session.scheduledAt).toLocaleString()}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {session.meetingLink
                          ? "Google Meet ready"
                          : "Session is being prepared"}
                      </p>
                    </div>

                    {/* Right Content */}

                    <div className="flex flex-col gap-3 md:items-end">
                      <span className="rounded-full border px-4 py-2 text-center text-sm capitalize">
                        {session.status}
                      </span>

                      {!session.meetingLink ? (
                        <button
                          disabled
                          className="rounded-xl border px-5 py-3 text-sm text-gray-400"
                        >
                          Session setup in progress
                        </button>
                      ) : canJoin ? (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-black px-5 py-3 text-center text-sm text-white transition hover:opacity-90"
                        >
                          Join Session
                        </a>
                      ) : (
                        <button
                          disabled
                          className="rounded-xl border px-5 py-3 text-sm text-gray-400"
                        >
                          Available 10 min before class
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLiveSessions;

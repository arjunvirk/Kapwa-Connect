import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { listHomework } from "../actions/homeworkActions";

import { listMCQ } from "../actions/mcqActions";

import { getStudents } from "../actions/userActions";

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  // HOMEWORK

  const homeworkList = useSelector((state) => state.homeworkList);

  const { homeworks } = homeworkList;

  // MCQ

  const mcqList = useSelector((state) => state.mcqList);

  const { mcqs } = mcqList;

  // STUDENTS

  const studentList = useSelector((state) => state.studentList);

  const { students } = studentList;

  useEffect(() => {
    dispatch(listHomework());

    dispatch(listMCQ());

    dispatch(getStudents());
  }, [dispatch]);

  // LATEST ITEMS

  const latestHomework = homeworks?.[0];

  const latestMCQ = mcqs?.[0];

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">Teacher Dashboard</h1>

          <p className="mt-3 text-gray-600">
            Manage homework, quizzes, students, games, and classroom activities.
          </p>
        </div>

        {/* Quick Actions */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* LIVE SESSIONS */}

          <Link
            to="/teacher/live-sessions"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Live Classes</p>

            <h2 className="mt-2 text-xl font-semibold">Live Sessions</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Schedule and manage 1-on-1 live classes.
            </p>
          </Link>

          {/* CREATE HOMEWORK */}

          <Link
            to="/teacher/homework/create"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Homework</p>

            <h2 className="mt-2 text-xl font-semibold">Create Homework</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Assign homework to students.
            </p>
          </Link>

          {/* VIEW HOMEWORK */}

          <Link
            to="/teacher/homework"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Homework</p>

            <h2 className="mt-2 text-xl font-semibold">View Homework</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Review created assignments.
            </p>
          </Link>

          {/* CREATE MCQ */}

          <Link
            to="/teacher/mcq/create"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">MCQ Tests</p>

            <h2 className="mt-2 text-xl font-semibold">Create MCQ</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Create language quizzes.
            </p>
          </Link>

          {/* VIEW MCQ */}

          <Link
            to="/teacher/mcq"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">MCQ Tests</p>

            <h2 className="mt-2 text-xl font-semibold">View MCQ</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Manage created quizzes.
            </p>
          </Link>

          {/* CROSSWORD GAME */}

          <Link
            to="/teacher/games/crossword"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Games</p>

            <h2 className="mt-2 text-xl font-semibold">Crossword Manager</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Add and manage Tagalog crossword questions.
            </p>
          </Link>

          {/* FILL BLANK GAME */}

          <Link
            to="/teacher/games/fill-blanks"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Games</p>

            <h2 className="mt-2 text-xl font-semibold">Fill Blank Manager</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Create sentence-based learning challenges.
            </p>
          </Link>

          {/* WORD MATCH GAME */}

          <Link
            to="/teacher/games/word-match"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Games</p>

            <h2 className="mt-2 text-xl font-semibold">Word Match Manager</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Manage Tagalog and English matching exercises.
            </p>
          </Link>

          {/* STUDENTS */}

          <Link
            to="/teacher/students"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Students</p>

            <h2 className="mt-2 text-xl font-semibold">View Students</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Track student progress.
            </p>
          </Link>

          {/* RESULTS */}

          <Link
            to="/teacher/results"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Results</p>

            <h2 className="mt-2 text-xl font-semibold">MCQ Results</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Review quiz performance.
            </p>
          </Link>

          <Link
            to="/teacher/reviews"
            className="rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">Reviews</p>
            <h2 className="mt-2 text-xl font-semibold">Student Reviews</h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Approve and manage testimonials.
            </p>
          </Link>
        </div>

        {/* Recent Activity */}

        <div className="mt-12 rounded-3xl border p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Recent Activity</h2>

              <p className="mt-2 text-sm text-gray-500">
                Latest classroom updates
              </p>
            </div>

            <span className="rounded-full border px-4 py-2 text-sm">Live</span>
          </div>

          <div className="space-y-4">
            {/* Homework */}

            {latestHomework && (
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                <div>
                  <h3 className="font-medium">New homework created</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {latestHomework.title}
                  </p>
                </div>

                <span className="text-sm text-gray-500">Homework</span>
              </div>
            )}

            {/* MCQ */}

            {latestMCQ && (
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                <div>
                  <h3 className="font-medium">New MCQ created</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {latestMCQ.title}
                  </p>
                </div>

                <span className="text-sm text-gray-500">MCQ</span>
              </div>
            )}

            {/* Students */}

            <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
              <div>
                <h3 className="font-medium">Registered Students</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Total students in platform
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {students?.length} Students
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;

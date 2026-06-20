import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { listHomework } from "../actions/homeworkActions";

import { listMCQ } from "../actions/mcqActions";

import { listMyAttempts } from "../actions/mcqActions";
import ReviewPopup from "../components/ReviewPopup";

const StudentDashboard = () => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  useEffect(() => {
    const checkReviewPopup = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/reviews/my-review`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        // already reviewed
        if (data.hasReviewed) {
          return;
        }

        const dismissedAt = localStorage.getItem("reviewPopupDismissed");

        if (!dismissedAt) {
          setTimeout(() => {
            setShowReviewPopup(true);
          }, 5000);

          return;
        }

        const twentyFourHours = 24 * 60 * 60 * 1000;

        const now = Date.now();

        if (now - Number(dismissedAt) > twentyFourHours) {
          setTimeout(() => {
            setShowReviewPopup(true);
          }, 5000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkReviewPopup();
  }, []);

  const dispatch = useDispatch();

  // USER INFO

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  // MCQ LIST

  const mcqAttemptList = useSelector((state) => state.mcqAttemptList);

  const { attempts } = mcqAttemptList;

  // HOMEWORK LIST

  const homeworkList = useSelector((state) => state.homeworkList);

  const { loading, error, homeworks } = homeworkList;

  // MCQ LIST

  const mcqList = useSelector((state) => state.mcqList);

  const { mcqs } = mcqList;

  useEffect(() => {
    dispatch(listHomework());

    dispatch(listMCQ());

    dispatch(listMyAttempts());
  }, [dispatch]);
  // COMPLETED HOMEWORK

  const completedHomework =
    homeworks?.filter((homework) =>
      homework.submissions?.some(
        (submission) => submission.student === userInfo?._id,
      ),
    ) || [];

  // PENDING HOMEWORK

  const pendingHomework = (homeworks?.length || 0) - completedHomework.length;

  // LATEST HOMEWORK

  const latestHomework = homeworks?.[0];

  // LATEST MCQ

  const latestMCQ = mcqs?.[0];
  const completedMCQs = attempts?.length || 0;

  return (
    <>
      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-2">
          {/* Left Side */}

          <div className="lg:sticky lg:top-28 text-center lg:text-left">
            <p className="mb-4 text-sm font-medium text-gray-500">
              Student Dashboard
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Organized Learning.
              <br />
              Better Progress.
            </h1>

            <p className="mt-8 mx-auto max-w-xl text-lg leading-8 text-gray-600 lg:mx-0">
              Students can easily access lessons, homework, quizzes, and track
              their performance through a clean and modern dashboard experience.
            </p>

            {/* Stats */}

            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-2">
              <div className="rounded-3xl border px-7 py-6 text-center">
                <p className="text-sm text-gray-500">Homework Completed</p>

                <h3 className="mt-3 text-4xl font-bold">
                  {completedHomework.length}
                </h3>
              </div>

              <div className="rounded-3xl border px-7 py-6 text-center">
                <p className="text-sm text-gray-500">Pending Homework</p>

                <h3 className="mt-3 text-4xl font-bold">{pendingHomework}</h3>
              </div>

              <div className="rounded-3xl border px-7 py-6 text-center">
                <p className="text-sm text-gray-500">MCQs Completed</p>

                <h3 className="mt-3 text-4xl font-bold">{completedMCQs}</h3>
              </div>

              <div className="rounded-3xl border px-7 py-6 text-center">
                <p className="text-sm text-gray-500">Pending MCQs</p>

                <h3 className="mt-3 text-4xl font-bold">
                  {Math.max((mcqs?.length || 0) - completedMCQs, 0)}
                </h3>
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="rounded-4xl border p-7 shadow-sm">
            {/* Top */}

            <div className="mb-7 flex items-start justify-between border-b pb-6">
              <div>
                <h2 className="text-2xl font-semibold">Student Dashboard</h2>

                <p className="mt-2 text-gray-500">
                  Welcome back, {userInfo?.name}
                </p>
              </div>

              <span className="rounded-full border px-4 py-2 text-sm">
                Active
              </span>
            </div>

            {/* Loading */}

            {loading && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                Loading dashboard...
              </div>
            )}

            {/* Error */}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            {/* Latest Homework */}

            {!loading && !error && latestHomework && (
              <div className="rounded-3xl border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {latestHomework.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
                      {latestHomework.description}
                    </p>
                  </div>

                  {latestHomework.deadline && (
                    <span className="text-sm text-gray-500">
                      Due{" "}
                      {new Date(latestHomework.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <Link
                  to="/student/homework"
                  className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:opacity-90"
                >
                  Open Homework
                </Link>
              </div>
            )}

            {/* Latest MCQ */}

            {!loading && latestMCQ && (
              <div className="mt-5 rounded-3xl border p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{latestMCQ.title}</h3>

                  <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
                    {latestMCQ.questions?.length || 0} Questions
                  </span>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {latestMCQ.description}
                </p>

                <Link
                  to="/student/mcq"
                  className="mt-5 inline-block rounded-xl border px-5 py-3 text-sm transition hover:bg-black hover:text-white"
                >
                  Open MCQs
                </Link>
              </div>
            )}

            {/* Live Sessions */}

            <div className="mt-5 rounded-3xl border p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Live Sessions</h3>

                <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
                  New
                </span>
              </div>

              <p className="text-sm leading-6 text-gray-600">
                Join your scheduled 1-on-1 live classes directly from your
                dashboard.
              </p>

              <Link
                to="/student/live-sessions"
                className="mt-5 inline-block rounded-xl border px-5 py-3 text-sm transition hover:bg-black hover:text-white"
              >
                Open Live Sessions
              </Link>
            </div>

            {/* Homework Progress */}

            <div className="mt-5 rounded-3xl border p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Homework Progress</h3>

                <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
                  {homeworks?.length || 0} Total
                </span>
              </div>

              {/* Progress Bar */}

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-black"
                  style={{
                    width: `${
                      homeworks?.length
                        ? (completedHomework.length / homeworks.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Progress: {completedHomework.length} / {homeworks?.length || 0}{" "}
                completed
              </p>

              <Link
                to="/student/homework"
                className="mt-5 inline-block rounded-xl border px-5 py-3 text-sm transition hover:bg-black hover:text-white"
              >
                View Homework
              </Link>
            </div>

            {/* Recent Activity */}

            <div className="mt-5 rounded-3xl border p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Recent Activity</h3>

                <span className="text-sm text-gray-500">Today</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <p className="font-medium">Homework assigned</p>

                  <span className="text-sm text-gray-500">
                    {homeworks?.length || 0} tasks
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <p className="font-medium">Homework completed</p>

                  <span className="text-sm text-gray-500">
                    {completedHomework.length} done
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <p className="font-medium">MCQs assigned</p>

                  <span className="text-sm text-gray-500">
                    {mcqs?.length || 0} tests
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <p className="font-medium">MCQs completed</p>

                  <span className="text-sm text-gray-500">
                    {completedMCQs} done
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showReviewPopup && (
        <ReviewPopup onClose={() => setShowReviewPopup(false)} />
      )}
    </>
  );
};

export default StudentDashboard;

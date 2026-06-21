import React from "react";

const DashboardPreview = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* Left Side */}

        <div>
          <p className="mb-4 text-center text-sm font-medium text-gray-500 md:text-left">
            Student Dashboard
          </p>

          <h2 className="text-center text-3xl font-bold leading-tight md:text-left md:text-5xl">
            Organized Learning.
            <br />
            Better Progress.
          </h2>

          <p className="mt-6 max-w-lg text-center leading-7 text-gray-600 md:text-left">
            Students can easily access lessons, homework, quizzes, and track
            their performance through a clean and modern dashboard experience.
          </p>

          <div className="mt-8 flex gap-4">
            <div className="rounded-2xl border px-6 py-4">
              <p className="text-sm text-gray-500">Homework Completed</p>

              <h3 className="mt-2 text-2xl font-semibold">24</h3>
            </div>

            <div className="rounded-2xl border px-6 py-4">
              <p className="text-sm text-gray-500">Quiz Accuracy</p>

              <h3 className="mt-2 text-2xl font-semibold">92%</h3>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          {/* Top */}

          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-semibold">Student Dashboard</h3>

              <p className="text-sm text-gray-500">Welcome back, Maria</p>
            </div>

            <span className="rounded-full border px-3 py-1 text-sm">
              Active
            </span>
          </div>

          {/* Homework Card */}

          <div className="mb-4 rounded-2xl border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium">Homework</h4>

              <span className="text-sm text-gray-500">Due Tomorrow</span>
            </div>

            <p className="text-sm leading-6 text-gray-600">
              Practice common greetings and basic sentence structures in
              Tagalog.
            </p>
          </div>

          {/* Quiz Card */}

          <div className="mb-4 rounded-2xl border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium">Vocabulary Quiz</h4>

              <span className="rounded-full bg-black px-3 py-1 text-sm text-white">
                15 Questions
              </span>
            </div>

            <div className="mt-4 h-2 rounded-full bg-gray-200">
              <div className="h-2 w-[78%] rounded-full bg-black"></div>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Progress: 78% completed
            </p>
          </div>

          {/* Recent Activity */}

          <div className="rounded-2xl border p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium">Recent Activity</h4>

              <span className="text-sm text-gray-500">Today</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <p className="text-sm">Homework submitted</p>

                <span className="text-sm text-gray-500">2h ago</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <p className="text-sm">Quiz completed</p>

                <span className="text-sm text-gray-500">5h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;

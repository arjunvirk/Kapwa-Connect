import { Link } from "react-router-dom";
import Animation from "./TypeAnimation";

const Hero = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* Left Content */}

        <div>
          <p className="mb-4 text-center text-sm font-medium text-gray-500 md:text-left">
            Learn Filipino Online
          </p>

          <h1 className="text-center text-4xl font-bold leading-tight md:text-left md:text-6xl">
            <Animation />
          </h1>

          <p className="mt-6 max-w-lg text-center text-gray-600 md:text-left">
            Interactive lessons, homework, quizzes, and guided learning designed
            to help students master the Tagalog language step by step.
          </p>

          <div className="mt-8 flex justify-center gap-4 md:justify-start">
            <Link
              to="/register"
              className="rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-lg border px-6 py-3 transition hover:bg-black hover:text-white"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Content */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-gray-500">Active Lessons</p>

              <h3 className="mt-2 text-2xl font-semibold">
                15 Language Sessions
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border p-4">
                <p className="text-sm text-gray-500">Vocabulary Quizzes</p>

                <h3 className="mt-2 text-xl font-semibold">10 Available</h3>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="text-sm text-gray-500">Students</p>

                <h3 className="mt-2 text-xl font-semibold">80+</h3>
              </div>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium">Recent Homework</p>

                <span className="text-sm text-gray-500">Today</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <div>
                  <h4 className="font-medium">Tagalog Greetings</h4>

                  <p className="text-sm text-gray-500">Submitted by Maria</p>
                </div>

                <span className="rounded-full border px-3 py-1 text-sm">
                  Reviewed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

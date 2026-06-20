import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl rounded-4xl bg-black px-8 py-16 text-white md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium text-gray-300">
            Start Learning Today
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Build Confidence
            <br />
            In Speaking Filipino.
          </h2>

          <p className="mt-6 leading-7 text-gray-300">
            Join interactive lessons, complete assignments, and improve your
            Tagalog skills through a modern and organized learning experience.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-white px-6 py-3 font-medium transition hover:bg-white hover:text-black"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

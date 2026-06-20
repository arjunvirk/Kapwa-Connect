import React from "react";

const LiveSection = () => {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl rounded-4xl bg-black px-8 py-16 text-white md:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium text-gray-300">
            Live Learning Sessions
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Learn Filipino
            <br />
            Through Live Classes.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-300">
            Join personalized Google Meet sessions with your mentor, practice
            real conversations, improve pronunciation, and receive direct
            feedback designed for your learning journey.
          </p>

          {/* Benefits */}

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold">1-on-1 Sessions</h3>

              <p className="mt-3 text-sm text-gray-300">
                Personalized lessons tailored to your skill level.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold">Google Meet Classes</h3>

              <p className="mt-3 text-sm text-gray-300">
                Attend live lessons from anywhere in the world.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold">Flexible Schedule</h3>

              <p className="mt-3 text-sm text-gray-300">
                Learn at a time that fits your daily routine.
              </p>
            </div>
          </div>

          {/* CTA */}

          <div className="mt-12">
            <button className="rounded-xl bg-white px-8 py-3 font-medium text-black transition hover:opacity-90">
              Book A Live Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveSection;

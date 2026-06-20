import React from "react";

const Features = () => {
  const features = [
    {
      title: "Interactive Homework",
      description:
        "Practice Tagalog through structured assignments and guided exercises.",
    },

    {
      title: "Vocabulary Quizzes",
      description:
        "Test your understanding with MCQ quizzes designed for language learning.",
    },

    {
      title: "Track Progress",
      description:
        "Monitor completed lessons, quiz scores, and learning improvement.",
    },

    {
      title: "Simple Learning Experience",
      description:
        "Clean and organized platform focused entirely on effective learning.",
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium text-gray-500">
            Platform Features
          </p>

          <h2 className="text-3xl font-bold md:text-5xl">
            Everything Needed To
            <br />
            Learn Filipino Online
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            A modern learning experience designed to help students stay
            organized, engaged, and confident while learning Tagalog.
          </p>
        </div>

        {/* Features Grid */}

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border text-lg font-semibold">
                0{index + 1}
              </div>

              <h3 className="text-2xl font-semibold">{feature.title}</h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

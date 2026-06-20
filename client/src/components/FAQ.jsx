import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need any prior knowledge of Tagalog?",
      answer:
        "No. Lessons are designed for complete beginners as well as students who want to improve their speaking, reading, and listening skills.",
    },

    {
      question: "How are the lessons conducted?",
      answer:
        "Lessons are conducted online through scheduled live sessions, interactive homework, quizzes, and guided learning activities.",
    },

    {
      question: "Can I learn at my own pace?",
      answer:
        "Yes. Students can review lessons, complete assignments, and practice vocabulary at their own pace between live sessions.",
    },

    {
      question: "Will I receive homework and quizzes?",
      answer:
        "Yes. Homework assignments, vocabulary exercises, and quizzes are provided regularly to reinforce learning and track progress.",
    },

    {
      question: "How do live classes work?",
      answer:
        "Teachers schedule live sessions through Google Meet. Students can join directly from their dashboard when the class becomes available.",
    },

    {
      question: "How can I track my progress?",
      answer:
        "The platform allows students to view completed activities, quiz performance, and overall learning progress throughout the course.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium text-gray-500">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl font-bold md:text-5xl">
            Everything You Need
            <br />
            To Know Before Starting
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Find answers to common questions about lessons, live classes,
            assignments, and learning Tagalog online.
          </p>
        </div>

        {/* FAQ List */}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border transition hover:shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold">{faq.question}</span>

                <span className="text-2xl font-light">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="border-t px-6 py-5">
                  <p className="leading-7 text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

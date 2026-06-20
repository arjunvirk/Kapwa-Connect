import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { getMCQDetails } from "../actions/mcqActions";

import { attemptMCQ, listMyAttempts } from "../actions/mcqAttemptActions";

const StudentMCQDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // MCQ DETAILS

  const mcqDetails = useSelector((state) => state.mcqDetails);

  const { loading, error, mcq } = mcqDetails;

  // MCQ ATTEMPT

  const mcqAttempt = useSelector((state) => state.mcqAttempt);

  const {
    loading: attemptLoading,
    error: attemptError,
    success: attemptSuccess,
    attempt,
  } = mcqAttempt;

  // MY ATTEMPTS

  const mcqAttemptList = useSelector((state) => state.mcqAttemptList);

  const { attempts } = mcqAttemptList;

  // ANSWERS

  const [answers, setAnswers] = useState({});

  // FETCH MCQ + ATTEMPTS

  useEffect(() => {
    dispatch(getMCQDetails(id));

    dispatch(listMyAttempts());
  }, [dispatch, id]);

  // EXISTING ATTEMPT

  const existingAttempt = attempts?.find(
    (attemptItem) => attemptItem.mcq?._id === id,
  );

  // RESTORE ANSWERS

  useEffect(() => {
    if (existingAttempt?.answers) {
      const restoredAnswers = {};

      existingAttempt.answers.forEach((answer) => {
        restoredAnswers[answer.questionIndex] = answer.selectedOption;
      });

      setAnswers(restoredAnswers);
    }
  }, [existingAttempt]);

  // CHECK SUBMITTED

  const alreadySubmitted = !!existingAttempt;

  // SELECT OPTION

  const answerHandler = (questionIndex, optionIndex) => {
    if (alreadySubmitted) return;

    setAnswers({
      ...answers,

      [questionIndex]: optionIndex,
    });
  };

  // SUBMIT MCQ

  const submitHandler = (e) => {
    e.preventDefault();

    const formattedAnswers = Object.keys(answers).map((key) => ({
      questionIndex: Number(key),

      selectedOption: Number(answers[key]),
    }));

    dispatch(attemptMCQ(id, formattedAnswers));
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Back */}

        <div className="mb-6">
          <Link
            to="/student/mcq"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            ← Back to MCQs
          </Link>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading MCQ...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Attempt Error */}

        {attemptError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {attemptError}
          </div>
        )}

        {/* MCQ */}

        {!loading && !error && mcq && (
          <div className="rounded-3xl border p-8 shadow-sm">
            {/* Heading */}

            <div className="border-b pb-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h1 className="text-4xl font-bold">{mcq.title}</h1>

                  <p className="mt-4 text-gray-600">{mcq.description}</p>
                </div>

                {mcq.deadline && (
                  <span className="rounded-full border px-4 py-2 text-sm">
                    Due {new Date(mcq.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Questions */}

            <form onSubmit={submitHandler} className="mt-8 space-y-8">
              {mcq.questions?.map((question, index) => (
                <div key={index} className="rounded-3xl border p-6">
                  {/* Question */}

                  <h2 className="text-2xl font-semibold leading-9">
                    {index + 1}. {question.question}
                  </h2>

                  {/* Options */}

                  <div className="mt-6 space-y-4">
                    {question.options?.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                          answers[index] === optionIndex
                            ? "border-black bg-black text-white"
                            : ""
                        } ${
                          alreadySubmitted
                            ? "cursor-not-allowed opacity-70"
                            : "cursor-pointer hover:border-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={answers[index] === optionIndex}
                          onChange={() => answerHandler(index, optionIndex)}
                          disabled={alreadySubmitted}
                          className="hidden"
                        />

                        <span className="text-sm font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Success */}

              {(attemptSuccess || alreadySubmitted) && (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
                  <h2 className="text-2xl font-bold text-green-700">
                    MCQ Submitted
                  </h2>

                  <p className="mt-3 text-green-700">
                    Your answers have been saved successfully.
                  </p>

                  <div className="mt-4 text-lg font-semibold text-green-700">
                    Score: {existingAttempt?.score || attempt?.score || 0} /{" "}
                    {mcq.questions?.length}
                  </div>
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={attemptLoading || alreadySubmitted}
                className={`w-full rounded-xl py-4 text-white transition ${
                  attemptLoading || alreadySubmitted
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-black hover:opacity-90"
                }`}
              >
                {alreadySubmitted
                  ? "Already Submitted"
                  : attemptLoading
                    ? "Submitting..."
                    : "Submit MCQ"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentMCQDetails;

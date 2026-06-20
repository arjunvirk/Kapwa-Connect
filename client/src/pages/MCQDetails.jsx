import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { getMCQDetails, updateMCQ } from "../actions/mcqActions";

import { toast } from "sonner";

const MCQDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // MCQ DETAILS

  const mcqDetails = useSelector((state) => state.mcqDetails);

  const { loading, error, mcq } = mcqDetails;

  // MCQ UPDATE

  const mcqUpdate = useSelector((state) => state.mcqUpdate);

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = mcqUpdate;

  // STATES

  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState("");

  const [questions, setQuestions] = useState([]);

  // FETCH MCQ DETAILS

  useEffect(() => {
    dispatch(getMCQDetails(id));
  }, [dispatch, id]);

  // SET DATA

  useEffect(() => {
    if (mcq) {
      setTitle(mcq.title || "");

      setDescription(mcq.description || "");

      setDeadline(mcq.deadline ? mcq.deadline.split("T")[0] : "");

      setQuestions(mcq.questions || []);
    }
  }, [mcq]);

  // QUESTION CHANGE

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].question = value;

    setQuestions(updatedQuestions);
  };

  // OPTION CHANGE

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].options[optionIndex] = value;

    setQuestions(updatedQuestions);
  };

  // CORRECT ANSWER CHANGE

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].correctAnswer = Number(value);

    setQuestions(updatedQuestions);
  };

  // ADD QUESTION

  const addQuestionHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);

    toast.success("Question added");
  };

  // REMOVE QUESTION

  const removeQuestionHandler = (index) => {
    if (questions.length === 1) {
      toast.error("At least one question is required");
      return;
    }

    const updatedQuestions = questions.filter((_, i) => i !== index);

    setQuestions(updatedQuestions);

    toast.success("Question removed");
  };

  // UPDATE HANDLER

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !description || !deadline) {
      toast.warning("Please fill all required fields");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} is empty`);
        return;
      }

      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast.error(`Option ${j + 1} in Question ${i + 1} is empty`);
          return;
        }
      }
    }

    dispatch(
      updateMCQ(id, {
        title,
        description,
        deadline,
        questions,
      }),
    );

    setEditMode(false);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("MCQ updated successfully");
    }

    if (error) {
      toast.error(error);
    }

    if (updateError) {
      toast.error(updateError);
    }
  }, [updateSuccess, error, updateError]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Loading MCQ details...
          </div>
        )}

        {/* Content */}

        {!loading && !error && mcq && (
          <form onSubmit={updateHandler} className="space-y-8">
            {/* Top Section */}

            <div className="rounded-3xl border p-8 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold">MCQ Details</h1>

                  <p className="mt-3 text-gray-600">
                    View and manage quiz information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditMode(!editMode)}
                  className="rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
                >
                  {editMode ? "Cancel Edit" : "Edit MCQ"}
                </button>
              </div>

              {/* Title */}

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Title</label>

                <input
                  type="text"
                  value={title}
                  disabled={!editMode}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none disabled:bg-gray-100"
                />
              </div>

              {/* Description */}

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows="5"
                  value={description}
                  disabled={!editMode}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none disabled:bg-gray-100"
                ></textarea>
              </div>

              {/* Deadline */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Deadline
                </label>

                <input
                  type="date"
                  value={deadline}
                  disabled={!editMode}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Questions */}

            <div className="space-y-8">
              {questions.map((question, index) => (
                <div key={index} className="rounded-3xl border p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                      Question {index + 1}
                    </h2>

                    {editMode && (
                      <button
                        type="button"
                        onClick={() => removeQuestionHandler(index)}
                        className="cursor-pointer rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Question */}

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Question
                    </label>

                    <input
                      type="text"
                      value={question.question}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none disabled:bg-gray-100"
                    />
                  </div>

                  {/* Options */}

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label className="mb-2 block text-sm font-medium">
                          Option {optionIndex + 1}
                        </label>

                        <input
                          type="text"
                          value={option}
                          disabled={!editMode}
                          onChange={(e) =>
                            handleOptionChange(
                              index,
                              optionIndex,
                              e.target.value,
                            )
                          }
                          className="w-full rounded-xl border px-4 py-3 outline-none disabled:bg-gray-100"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer */}

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium">
                      Correct Answer
                    </label>

                    <select
                      value={question.correctAnswer}
                      disabled={!editMode}
                      onChange={(e) =>
                        handleCorrectAnswerChange(index, e.target.value)
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none disabled:bg-gray-100"
                    >
                      <option value={0}>Option 1</option>

                      <option value={1}>Option 2</option>

                      <option value={2}>Option 3</option>

                      <option value={3}>Option 4</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Question */}

            {editMode && (
              <button
                type="button"
                onClick={addQuestionHandler}
                className="w-full rounded-xl border py-3 font-medium transition hover:bg-black hover:text-white"
              >
                Add Question
              </button>
            )}

            {/* Update */}

            {editMode && (
              <button
                type="submit"
                disabled={updateLoading}
                className="w-full cursor-pointer rounded-xl bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70"
              >
                {updateLoading ? "Saving Changes..." : "Update MCQ"}
              </button>
            )}
          </form>
        )}
      </div>
    </section>
  );
};
export default MCQDetails;

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createMCQ } from "../actions/mcqActions";

import { getStudents } from "../actions/userActions";

import { toast } from "sonner";

const CreateMCQ = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState("");

  const [assignToAll, setAssignToAll] = useState(false);

  const [assignedTo, setAssignedTo] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  // MCQ CREATE

  const mcqCreate = useSelector((state) => state.mcqCreate);

  const { loading, error, success } = mcqCreate;

  // STUDENTS

  const studentList = useSelector((state) => state.studentList);

  const { students } = studentList;

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  // HANDLE QUESTION CHANGE

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].question = value;

    setQuestions(updatedQuestions);
  };

  // HANDLE OPTION CHANGE

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].options[optionIndex] = value;

    setQuestions(updatedQuestions);
  };

  // HANDLE CORRECT ANSWER

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].correctAnswer = value;

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

    toast.success("New question added");
  };

  const removeQuestionHandler = (index) => {
    if (questions.length === 1) {
      toast.error("At least one question is required");
      return;
    }

    const updatedQuestions = questions.filter(
      (_, questionIndex) => questionIndex !== index,
    );

    setQuestions(updatedQuestions);

    toast.success("Question removed");
  };

  // SUBMIT

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !description || !deadline) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (!assignToAll && !assignedTo) {
      toast.error("Please select a student");
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
      createMCQ({
        title,
        description,
        deadline,
        assignedTo: assignToAll ? "all" : assignedTo,
        questions,
      }),
    );
  };

  // RESET AFTER SUCCESS

  useEffect(() => {
    if (success) {
      setTitle("");

      setDescription("");

      setDeadline("");

      setAssignToAll(false);

      setAssignedTo("");

      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ]);
    }
  }, [success]);

  useEffect(() => {
    if (success) {
      toast.success("MCQ created successfully");
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border p-8 shadow-sm">
        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Create MCQ</h1>

          <p className="mt-3 text-gray-600">
            Create quizzes and vocabulary tests for students.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={submitHandler} className="space-y-8">
          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium">MCQ Title</label>

            <input
              type="text"
              placeholder="Enter MCQ title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Write MCQ instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            ></textarea>
          </div>

          {/* Deadline */}

          <div>
            <label className="mb-2 block text-sm font-medium">Deadline</label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Assign To All */}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={assignToAll}
              onChange={(e) => setAssignToAll(e.target.checked)}
              className="h-4 w-4"
            />

            <label className="text-sm font-medium">
              Assign to all students
            </label>
          </div>

          {/* Single Student */}

          {!assignToAll && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Assign To Student
              </label>

              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Select Student</option>

                {students?.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Questions */}

          <div className="space-y-8">
            {questions.map((question, index) => (
              <div key={index} className="rounded-3xl border p-6">
                <h2 className="mb-5 text-2xl font-semibold">
                  Question {index + 1}
                </h2>

                <div className="mb-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeQuestionHandler(index)}
                    className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    Remove Question
                  </button>
                </div>

                {/* Question */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Question
                  </label>

                  <input
                    type="text"
                    placeholder="Enter question"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
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
                        placeholder={`Enter option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e.target.value)
                        }
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
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
                    onChange={(e) =>
                      handleCorrectAnswerChange(index, Number(e.target.value))
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
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

          <button
            type="button"
            onClick={addQuestionHandler}
            className="w-full rounded-xl border py-3 font-medium transition hover:bg-black hover:text-white cursor-pointer"
          >
            Add Question
          </button>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Publishing MCQ..." : "Create MCQ"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateMCQ;

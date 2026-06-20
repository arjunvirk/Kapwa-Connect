import { useEffect, useState } from "react";

const TeacherCrossword = () => {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [hint, setHint] = useState("");

  const [difficulty, setDifficulty] = useState("easy");

  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState("");

  const [questions, setQuestions] = useState([]);

  // FETCH QUESTIONS

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crossword`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch questions");
      }

      setQuestions(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // LOAD QUESTIONS

  useEffect(() => {
    fetchQuestions();
  }, []);

  // CREATE QUESTION

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccessMessage("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crossword`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question,
            answer,
            hint,
            difficulty,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create question");
      }

      setSuccessMessage("Crossword question created successfully 🎉");

      // REFRESH QUESTIONS

      fetchQuestions();

      // AUTO REMOVE MESSAGE

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // RESET FORM

      setQuestion("");

      setAnswer("");

      setHint("");

      setDifficulty("easy");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE QUESTION

  const deleteQuestionHandler = async (id) => {
    const confirmDelete = window.confirm("Delete this crossword question?");

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crossword/${id}`,
        {
          method: "DELETE",

          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete question");
      }

      // REMOVE FROM UI

      setQuestions((prev) => prev.filter((question) => question._id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-black to-zinc-900 px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1 text-xs uppercase tracking-widest text-pink-300">
            Teacher Panel
          </p>

          <h1 className="mb-4 text-4xl font-black md:text-6xl">
            Crossword Manager 🧠
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Create crossword questions for students and make Tagalog learning
            more interactive.
          </p>
        </div>

        {/* FORM CARD */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-10">
          {/* SUCCESS */}

          {successMessage && (
            <div className="mb-6 rounded-2xl bg-green-500/20 px-5 py-4 text-sm font-semibold text-green-300">
              {successMessage}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-2xl bg-red-500/20 px-5 py-4 text-sm font-semibold text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            {/* QUESTION */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Question
              </label>

              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Example: Hello in Tagalog"
                className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-pink-500"
              />
            </div>

            {/* ANSWER */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Answer
              </label>

              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value.toUpperCase())}
                placeholder="Example: KUMUSTA"
                className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white uppercase outline-none transition focus:border-pink-500"
              />
            </div>

            {/* HINT */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Hint
              </label>

              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Optional hint..."
                className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-pink-500"
              />
            </div>

            {/* DIFFICULTY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-pink-500"
              >
                <option value="easy">Easy</option>

                <option value="medium">Medium</option>

                <option value="hard">Hard</option>
              </select>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-2xl bg-pink-500 px-5 py-4 text-lg font-bold transition hover:scale-[1.02] hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Question..." : "Create Crossword Question"}
            </button>
          </form>
        </div>

        {/* QUESTIONS LIST */}

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black">Created Questions 🎮</h2>

            <p className="mt-2 text-zinc-400">Manage crossword questions.</p>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6 text-center text-zinc-500">
              No crossword questions yet.
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map((item) => (
                <div
                  key={item._id}
                  className="rounded-3xl border border-zinc-800 bg-black/40 p-5"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    {/* LEFT */}

                    <div>
                      <h3 className="text-2xl font-black text-pink-300">
                        {item.question}
                      </h3>

                      <p className="mt-2 text-zinc-400">
                        Answer:
                        <span className="ml-2 font-bold uppercase text-white">
                          {item.answer}
                        </span>
                      </p>

                      {item.hint && (
                        <p className="mt-1 text-zinc-500">Hint: {item.hint}</p>
                      )}

                      <div className="mt-3 inline-block rounded-full bg-pink-500/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
                        {item.difficulty}
                      </div>
                    </div>

                    {/* DELETE */}

                    <button
                      onClick={() => deleteQuestionHandler(item._id)}
                      disabled={deleteLoading}
                      className="cursor-pointer rounded-2xl bg-red-500 px-6 py-4 text-lg font-black transition hover:scale-105 hover:bg-red-600 disabled:opacity-50"
                    >
                      Delete ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeacherCrossword;

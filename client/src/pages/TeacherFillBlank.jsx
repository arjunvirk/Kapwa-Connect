import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const TeacherFillBlank = () => {
  const [sentence, setSentence] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");

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
        `${import.meta.env.VITE_API_URL}/api/fill-blanks`,
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

  // SUBMIT

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccessMessage("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/fill-blanks`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sentence,
            correctAnswer,
            hint,
            difficulty,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create question");
      }

      setSuccessMessage("Fill blank game created successfully 🎉");

      // REFRESH QUESTIONS

      fetchQuestions();

      // REMOVE SUCCESS

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // RESET

      setSentence("");

      setCorrectAnswer("");

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
    const confirmDelete = window.confirm("Delete this fill blank question?");

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/fill-blanks/${id}`,
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
    <section className="min-h-screen bg-linear-to-b from-black via-zinc-950 to-blue-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

        <div className="mb-12 text-center">
          <p className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-blue-300">
            Teacher Game Panel
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Fill Blank Builder ✍️
          </h1>

          <p className="mt-4 text-zinc-400">
            Create interactive Tagalog sentence games.
          </p>
        </div>

        {/* CREATE CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[40px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur md:p-10"
        >
          {/* SUCCESS */}

          {successMessage && (
            <div className="mb-6 rounded-3xl bg-green-500/20 p-5 text-center font-semibold text-green-300">
              {successMessage}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-3xl bg-red-500/20 p-5 text-center font-semibold text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-8">
            {/* SENTENCE */}

            <div>
              <label className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Sentence
              </label>

              <textarea
                rows={4}
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder="Example: Ako ay ______ ngayon."
                className="w-full rounded-3xl border border-zinc-700 bg-black px-6 py-5 text-lg outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              />
            </div>

            {/* ANSWER */}

            <div>
              <label className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Correct Word
              </label>

              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value.toUpperCase())}
                placeholder="Example: MASAYA"
                className="w-full rounded-3xl border border-zinc-700 bg-black px-6 py-5 text-lg uppercase outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              />
            </div>

            {/* HINT */}

            <div>
              <label className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Hint
              </label>

              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Optional hint..."
                className="w-full rounded-3xl border border-zinc-700 bg-black px-6 py-5 text-lg outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              />
            </div>

            {/* DIFFICULTY */}

            <div>
              <label className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-3xl border border-zinc-700 bg-black px-6 py-5 text-lg outline-none transition-all duration-300 focus:border-blue-500"
              >
                <option value="easy">Easy</option>

                <option value="medium">Medium</option>

                <option value="hard">Hard</option>
              </select>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-blue-500 px-6 py-5 text-xl font-black transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] disabled:opacity-50"
            >
              {loading ? "Creating Game..." : "Create Fill Blank Game ⚡"}
            </button>
          </form>
        </motion.div>

        {/* QUESTIONS LIST */}

        <div className="mt-10 rounded-[40px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)] backdrop-blur md:p-10">
          <div className="mb-8">
            <h2 className="text-4xl font-black">Created Questions 🎮</h2>

            <p className="mt-3 text-zinc-400">
              Manage fill blank sentence games.
            </p>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6 text-center text-zinc-500">
              No fill blank questions yet.
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map((item) => (
                <div
                  key={item._id}
                  className="rounded-3xl border border-zinc-800 bg-black/40 p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    {/* LEFT */}

                    <div className="flex-1">
                      <h3 className="text-2xl font-black leading-relaxed text-blue-300">
                        {item.sentence}
                      </h3>

                      <p className="mt-3 text-zinc-400">
                        Correct Answer:
                        <span className="ml-2 font-bold uppercase text-white">
                          {item.correctAnswer}
                        </span>
                      </p>

                      {item.hint && (
                        <p className="mt-2 text-zinc-500">Hint: {item.hint}</p>
                      )}

                      <div className="mt-4 inline-block rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
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

export default TeacherFillBlank;

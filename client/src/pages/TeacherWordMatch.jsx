import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const TeacherWordMatch = () => {
  const [title, setTitle] = useState("");

  const [difficulty, setDifficulty] = useState("easy");

  const [pairs, setPairs] = useState([
    {
      tagalog: "",
      english: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState("");

  const [games, setGames] = useState([]);

  // FETCH GAMES

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/word-match`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch games");
      }

      setGames(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // LOAD GAMES

  useEffect(() => {
    fetchGames();
  }, []);

  // HANDLE CHANGE

  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...pairs];

    updatedPairs[index][field] = value;

    setPairs(updatedPairs);
  };

  // ADD PAIR

  const addPair = () => {
    setPairs([
      ...pairs,
      {
        tagalog: "",
        english: "",
      },
    ]);
  };

  // REMOVE PAIR

  const removePair = (index) => {
    const updatedPairs = pairs.filter((_, i) => i !== index);

    setPairs(updatedPairs);
  };

  // CREATE GAME

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      setSuccessMessage("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/word-match`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title,
            pairs,
            difficulty,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create game");
      }

      setSuccessMessage("Word Match Game Created Successfully 🎉");

      // REFRESH GAMES

      fetchGames();

      // REMOVE MESSAGE

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // RESET

      setTitle("");

      setPairs([
        {
          tagalog: "",
          english: "",
        },
      ]);

      setDifficulty("easy");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE GAME

  const deleteGameHandler = async (id) => {
    const confirmDelete = window.confirm("Delete this word match game?");

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/word-match/${id}`,
        {
          method: "DELETE",

          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete game");
      }

      // REMOVE FROM UI

      setGames((prev) => prev.filter((game) => game._id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <p className="mb-4 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-purple-300">
            Teacher Game Panel
          </p>

          <h1 className="text-4xl font-black md:text-6xl">
            Word Match Builder 🎮
          </h1>

          <p className="mt-4 text-zinc-400">
            Create interactive Tagalog matching games.
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
          className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur"
        >
          {/* SUCCESS */}

          {successMessage && (
            <div className="mb-6 rounded-2xl bg-green-500/20 p-4 text-green-300">
              {successMessage}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-2xl bg-red-500/20 p-4 text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-8">
            {/* TITLE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Game Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Basic Greetings"
                className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-purple-500"
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
                className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-purple-500"
              >
                <option value="easy">Easy</option>

                <option value="medium">Medium</option>

                <option value="hard">Hard</option>
              </select>
            </div>

            {/* PAIRS */}

            <div className="space-y-5">
              {pairs.map((pair, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="grid gap-4 rounded-3xl border border-zinc-800 bg-black/50 p-5 md:grid-cols-2"
                >
                  <input
                    type="text"
                    value={pair.tagalog}
                    onChange={(e) =>
                      handlePairChange(index, "tagalog", e.target.value)
                    }
                    placeholder="Tagalog Word"
                    className="rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-purple-500"
                  />

                  <input
                    type="text"
                    value={pair.english}
                    onChange={(e) =>
                      handlePairChange(index, "english", e.target.value)
                    }
                    placeholder="English Meaning"
                    className="rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-purple-500"
                  />

                  {pairs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePair(index)}
                      className="rounded-2xl bg-red-500 px-4 py-3 font-semibold transition hover:bg-red-600 md:col-span-2"
                    >
                      Remove Pair
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* ADD BUTTON */}

            <button
              type="button"
              onClick={addPair}
              className="w-full rounded-2xl border border-dashed border-purple-500 bg-purple-500/10 px-5 py-4 text-lg font-bold text-purple-300 transition hover:bg-purple-500/20"
            >
              + Add More Word Pairs
            </button>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-purple-500 px-5 py-5 text-lg font-black transition hover:scale-[1.02] hover:bg-purple-600 disabled:opacity-50"
            >
              {loading ? "Creating Game..." : "Create Word Match Game"}
            </button>
          </form>
        </motion.div>

        {/* GAMES LIST */}

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur">
          <div className="mb-8">
            <h2 className="text-4xl font-black">Created Games 🎮</h2>

            <p className="mt-3 text-zinc-400">Manage word match games.</p>
          </div>

          {games.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6 text-center text-zinc-500">
              No word match games yet.
            </div>
          ) : (
            <div className="space-y-6">
              {games.map((game) => (
                <div
                  key={game._id}
                  className="rounded-3xl border border-zinc-800 bg-black/40 p-6"
                >
                  <div className="flex flex-col gap-6">
                    {/* TOP */}

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-3xl font-black text-purple-300">
                          {game.title}
                        </h3>

                        <div className="mt-4 inline-block rounded-full bg-purple-500/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
                          {game.difficulty}
                        </div>
                      </div>

                      {/* DELETE */}

                      <button
                        onClick={() => deleteGameHandler(game._id)}
                        disabled={deleteLoading}
                        className="rounded-2xl bg-red-500 px-6 py-4 text-lg font-black transition hover:scale-105 hover:bg-red-600 disabled:opacity-50"
                      >
                        Delete ❌
                      </button>
                    </div>

                    {/* PAIRS */}

                    <div className="grid gap-4 md:grid-cols-2">
                      {game.pairs.map((pair, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                        >
                          <p className="text-lg font-black text-purple-300">
                            {pair.tagalog}
                          </p>

                          <p className="mt-2 text-zinc-400">{pair.english}</p>
                        </div>
                      ))}
                    </div>
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

export default TeacherWordMatch;

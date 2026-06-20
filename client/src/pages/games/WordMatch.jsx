import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import { listWordMatchQuestions } from "../../actions/wordMatchActions";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const WordMatch = () => {
  const dispatch = useDispatch();

  const wordMatchList = useSelector((state) => state.wordMatchList);

  const { loading, error, questions } = wordMatchList;

  const [selectedLeft, setSelectedLeft] = useState(null);

  const [matches, setMatches] = useState([]);

  const [score, setScore] = useState(0);

  const [message, setMessage] = useState("");

  const [gameCompleted, setGameCompleted] = useState(false);

  // FETCH DATA

  useEffect(() => {
    dispatch(listWordMatchQuestions());
  }, [dispatch]);

  // GAME ROUND

  const game = questions?.[0];

  // SHUFFLE ENGLISH

  const shuffledEnglish = useMemo(() => {
    if (!game?.pairs) return [];

    return shuffleArray(game.pairs);
  }, [game]);

  // SPEAK

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);
  };

  // HANDLE MATCH

  const handleEnglishClick = (englishWord) => {
    if (!selectedLeft) {
      setMessage("Select a Tagalog word first ⚡");

      speakText("Select a Tagalog word first");

      return;
    }

    const isCorrect = selectedLeft.english === englishWord;

    // CORRECT MATCH

    if (isCorrect) {
      setMatches((prev) => [
        ...prev,
        {
          tagalog: selectedLeft.tagalog,
          english: englishWord,
        },
      ]);

      setScore((prev) => prev + 1);

      setMessage("Perfect Match 🎉");

      speakText("Perfect Match");

      document.body.style.background =
        "linear-gradient(to bottom, #052e16, #000)";

      setTimeout(() => {
        document.body.style.background = "";
      }, 300);
    } else {
      // WRONG MATCH

      setMessage("Wrong Match ❌");

      speakText("Wrong Match");

      document.body.style.background =
        "linear-gradient(to bottom, #450a0a, #000)";

      setTimeout(() => {
        document.body.style.background = "";
      }, 300);
    }

    setTimeout(() => {
      setMessage("");
    }, 1200);

    setSelectedLeft(null);
  };

  // GAME COMPLETE

  useEffect(() => {
    if (game?.pairs && matches.length === game.pairs.length) {
      setGameCompleted(true);

      speakText("Amazing! You completed the game");
    }
  }, [matches, game]);

  return (
    <section className="min-h-screen overflow-hidden bg-linear-to-b from-black via-zinc-950 to-purple-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-14 text-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: -40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-4 text-5xl font-black md:text-7xl"
          >
            Word Match ⚡
          </motion.h1>

          <p className="text-zinc-400">Match Tagalog words with meanings.</p>

          <p className="mt-4 text-sm text-purple-300">
            Click a Tagalog word → then click its meaning
          </p>
        </div>

        {/* LOADING */}

        {loading && <div className="text-center text-2xl">Loading Game...</div>}

        {/* ERROR */}

        {error && (
          <div className="rounded-3xl bg-red-500/20 p-5 text-center text-red-300">
            {error}
          </div>
        )}

        {/* GAME */}

        {!loading && game && (
          <>
            {/* SCORE */}

            <div className="mb-10 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: score > 0 ? [1, 1.1, 1] : 1,
                }}
                className="rounded-3xl border border-purple-500/30 bg-purple-500/10 px-8 py-5 text-center shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
                  Score
                </p>

                <h2 className="text-5xl font-black">{score}</h2>
              </motion.div>
            </div>

            {/* MESSAGE */}

            {message && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`mx-auto mb-10 max-w-md rounded-3xl p-4 text-center text-lg font-bold ${
                  message.includes("Perfect")
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* MATCH AREA */}

            <div className="relative grid grid-cols-2 gap-4 md:gap-10">
              {/* LEFT SIDE */}

              <div className="space-y-5">
                {game.pairs.map((pair, index) => {
                  const matched = matches.find(
                    (m) => m.tagalog === pair.tagalog,
                  );

                  return (
                    <motion.div
                      key={index}
                      id={pair.tagalog}
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() => !matched && setSelectedLeft(pair)}
                      className={`cursor-pointer rounded-3xl border p-3 md:p-6 text-center text-sm sm:text-lg md:text-2xl font-black transition-all duration-300 ${
                        selectedLeft?.tagalog === pair.tagalog
                          ? "border-yellow-400 bg-yellow-400/30 shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                          : matched
                            ? "border-green-500 bg-green-500/20 shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                            : "border-zinc-700 bg-zinc-900 hover:border-purple-500 hover:bg-purple-500/10"
                      }`}
                    >
                      {pair.tagalog}

                      {selectedLeft?.tagalog === pair.tagalog && (
                        <p className="mt-3 text-sm text-yellow-300">
                          Selected ⚡
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* RIGHT SIDE */}

              <div className="space-y-5">
                {shuffledEnglish.map((pair, index) => {
                  const matched = matches.find(
                    (m) => m.english === pair.english,
                  );

                  return (
                    <motion.div
                      key={index}
                      id={pair.english}
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        !matched && handleEnglishClick(pair.english)
                      }
                      className={`cursor-pointer rounded-3xl border p-3 md:p-6 text-center text-sm sm:text-lg md:text-2xl font-black transition-all duration-300 ${
                        matched
                          ? "border-green-500 bg-green-500/20 shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                          : "border-zinc-700 bg-zinc-900 hover:border-pink-500 hover:bg-pink-500/10"
                      }`}
                    >
                      {pair.english}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* COMPLETE */}

            {gameCompleted && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="mt-14 rounded-3xl border border-green-500/30 bg-green-500/10 p-10 text-center shadow-[0_0_50px_rgba(34,197,94,0.3)]"
              >
                <div className="mb-5 text-7xl">🏆</div>

                <h2 className="mb-4 text-5xl font-black">PERFECT MATCH 🎉</h2>

                <p className="mb-5 text-zinc-300">
                  You completed the challenge.
                </p>

                <h3 className="text-6xl font-black text-green-400">{score}</h3>

                <button
                  onClick={() => {
                    setMatches([]);

                    setScore(0);

                    setSelectedLeft(null);

                    setGameCompleted(false);
                  }}
                  className="mt-8 rounded-2xl bg-purple-500 px-8 py-4 text-lg font-black transition hover:scale-105 hover:bg-purple-600"
                >
                  Play Again
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* EMPTY */}

        {!loading && questions?.length === 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
            No word match games available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default WordMatch;

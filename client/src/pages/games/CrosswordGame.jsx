import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import { listCrosswordQuestions } from "../../actions/crosswordActions";

const CrosswordGame = () => {
  const dispatch = useDispatch();

  const crosswordList = useSelector((state) => state.crosswordList);

  const { loading, error, questions } = crosswordList;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [letters, setLetters] = useState([]);

  const [score, setScore] = useState(0);

  const [finalScore, setFinalScore] = useState(0);

  const [message, setMessage] = useState("");

  const [gameCompleted, setGameCompleted] = useState(false);

  const [shake, setShake] = useState(false);

  const inputRefs = useRef([]);

  // FETCH QUESTIONS

  useEffect(() => {
    dispatch(listCrosswordQuestions());
  }, [dispatch]);

  // CURRENT GAME

  const currentGame =
    currentQuestion < questions?.length ? questions[currentQuestion] : null;

  // SET LETTER BOXES

  useEffect(() => {
    if (currentGame?.answer) {
      setLetters(new Array(currentGame.answer.length).fill(""));
    }
  }, [currentGame]);

  // HANDLE INPUT

  const handleLetterChange = (value, index) => {
    if (!/^[A-Za-z]?$/.test(value)) return;

    const updatedLetters = [...letters];

    updatedLetters[index] = value.toUpperCase();

    setLetters(updatedLetters);

    // AUTO NEXT INPUT

    if (value && index < currentGame.answer.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // BACKSPACE NAVIGATION

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !letters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // CHECK ANSWER

  const checkAnswer = () => {
    if (!currentGame) return;

    const userAnswer = letters.join("");

    const isCorrect = userAnswer === currentGame.answer.toUpperCase();

    let newScore = score;

    // CORRECT

    if (isCorrect) {
      newScore = score + 1;

      setScore(newScore);

      setMessage("Correct Answer 🎉");


      speakText("Correct Answer");

      document.body.style.background =
        "linear-gradient(to bottom, #052e16, #000)";
    } else {
      // WRONG

      setMessage("Wrong Answer ❌");

      speakText("Wrong Answer");

      setShake(true);

      document.body.style.background =
        "linear-gradient(to bottom, #450a0a, #000)";

      setTimeout(() => {
        setShake(false);
      }, 500);
    }

    // RESET BG

    setTimeout(() => {
      document.body.style.background = "";
    }, 300);

    // NEXT QUESTION

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;

      // GAME COMPLETE

      if (nextQuestion >= questions.length) {
        setFinalScore(newScore);

        setGameCompleted(true);

        const finalPercentage = Math.round((newScore / questions.length) * 100);

        let speechMessage = "";

        if (finalPercentage >= 90) {
          speechMessage =
            "Excellent. You got almost every answer correct. Outstanding work.";
        } else if (finalPercentage >= 70) {
          speechMessage =
            "Amazing work. You performed very well in this challenge.";
        } else if (finalPercentage >= 50) {
          speechMessage =
            "Good job. You are improving. Keep practicing and you'll get even better.";
        } else {
          speechMessage =
            "Keep learning. Don't worry. Practice these words and try again.";
        }

        speakText(speechMessage);

        return;
      }

      // NEXT

      setCurrentQuestion(nextQuestion);

      setMessage("");
    }, 1200);
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.cancel(); // prevents overlapping voices
    speechSynthesis.speak(speech);
  };

  const totalQuestions = questions?.length || 0;

  const percentage =
    totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;

  let performanceTitle = "";
  let performanceMessage = "";
  let performanceSpeech = "";

  if (percentage >= 90) {
    performanceTitle = "🏆 Excellent!";
    performanceMessage =
      "Outstanding work! Your Tagalog vocabulary skills are excellent.";

    performanceSpeech =
      "Excellent. Outstanding work. Your Tagalog vocabulary skills are excellent.";
  } else if (percentage >= 70) {
    performanceTitle = "🎉 Amazing!";
    performanceMessage =
      "Great job! You have a strong understanding of these words.";

    performanceSpeech =
      "Amazing work. Great job. You have a strong understanding of these words.";
  } else if (percentage >= 50) {
    performanceTitle = "👍 Good Work!";
    performanceMessage = "Nice effort! Keep practicing to become even better.";

    performanceSpeech =
      "Good work. Nice effort. Keep practicing to become even better.";
  } else {
    performanceTitle = "📚 Keep Learning!";
    performanceMessage =
      "You're making progress. Review the words and try again to improve your score.";

    performanceSpeech =
      "Keep learning. You are making progress. Review the words and try again to improve your score.";
  }

  return (
    <section className="min-h-screen overflow-hidden bg-linear-to-b from-black via-zinc-950 to-blue-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-12 text-center">
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
            Crossword Challenge 🧠
          </motion.h1>

          <p className="text-zinc-400">
            Solve interactive Tagalog crossword puzzles.
          </p>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="text-center text-2xl">Loading Questions...</div>
        )}

        {/* ERROR */}

        {error && (
          <div className="rounded-3xl bg-red-500/20 p-5 text-center text-red-300">
            {error}
          </div>
        )}

        {/* GAME */}

        {!loading && !error && currentGame && !gameCompleted && (
          <motion.div
            animate={
              shake
                ? {
                    x: [-10, 10, -10, 10, 0],
                  }
                : {}
            }
            className="rounded-[40px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur md:p-10"
          >
            {/* TOP BAR */}

            <div className="mb-10 flex flex-col gap-5 rounded-3xl border border-zinc-800 bg-black/40 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  Question {currentQuestion + 1} / {questions.length}
                </p>

                <h2 className="mt-3 sm:text-2xl text-3xl font-black leading-relaxed">
                  {currentGame.question}
                </h2>

                {currentGame.hint && (
                  <p className="mt-3 text-blue-300 font-medium">
                    Hint: {currentGame.hint}
                  </p>
                )}
              </div>

              {/* SCORE */}

              <motion.div
                animate={{
                  scale: score > 0 ? [1, 1.1, 1] : 1,
                }}
                className="rounded-3xl bg-blue-500 px-6 py-4 text-center shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-blue-100">
                  Score
                </p>

                <h2 className="text-4xl font-black">{score}</h2>
              </motion.div>
            </div>

            {/* CROSSWORD BOARD */}

            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {letters.map((letter, index) => (
                <motion.input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e) => handleLetterChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  whileFocus={{
                    scale: 1.08,
                  }}
                  className="h-16 w-16 rounded-2xl border-2 border-zinc-700 bg-black text-center text-3xl font-black uppercase outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.6)] md:h-20 md:w-20 md:text-4xl"
                />
              ))}
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
                className={`mb-8 rounded-3xl p-5 text-center text-lg font-bold ${
                  message.includes("Correct")
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* BUTTON */}

            <button
              onClick={checkAnswer}
              className="w-full rounded-3xl bg-blue-500 px-6 py-5 text-xl font-black transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]"
            >
              Check Answer ⚡
            </button>
          </motion.div>
        )}

        {/* GAME COMPLETE */}

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
            className="rounded-[40px] border border-blue-500/30 bg-blue-500/10 p-10 text-center shadow-[0_0_60px_rgba(59,130,246,0.3)]"
          >
            <div className="mb-6 text-8xl">🏆</div>

            <h2 className="mb-4 text-5xl font-black">{performanceTitle}</h2>

            <p className="mb-8 text-zinc-300">{performanceMessage}</p>

            <div className="mx-auto mb-10 max-w-xs rounded-3xl border border-blue-500/30 bg-black/40 p-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-300">
                Final Score
              </p>

              <h2 className="text-7xl font-black text-blue-400">
                {finalScore}
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentQuestion(0);

                setLetters([]);

                setScore(0);

                setFinalScore(0);

                setMessage("");

                setGameCompleted(false);
              }}
              className="rounded-3xl bg-blue-500 px-8 py-5 text-xl font-black transition-all duration-300 hover:scale-105 hover:bg-blue-600"
            >
              Play Again 🎮
            </button>
          </motion.div>
        )}

        {/* EMPTY */}

        {!loading && questions?.length === 0 && (
          <div className="rounded-3xl bg-zinc-900 p-10 text-center text-zinc-400">
            No crossword questions available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default CrosswordGame;

import { Link } from "react-router-dom";

import { FaPuzzlePiece, FaKeyboard, FaGamepad } from "react-icons/fa";

const games = [
  {
    title: "Crossword Challenge",
    description:
      "Solve fun Tagalog crossword puzzles and improve your vocabulary skills.",
    icon: <FaPuzzlePiece size={34} />,
    path: "/games/crossword",
    button: "Play Now",
  },

  {
    title: "Fill In The Blanks",
    description:
      "Complete missing Tagalog words and practice sentence understanding.",
    icon: <FaKeyboard size={34} />,
    path: "/games/fill-blanks",
    button: "Start Learning",
  },

  {
    title: "Word Match",
    description: "Match Tagalog words with their correct English meanings.",
    icon: <FaGamepad size={34} />,
    path: "/games/word-match",
    button: "Play Match",
  },
];

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-black to-zinc-900 px-4 py-10 text-white">
      {/* TOP SECTION */}

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 inline-block rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1 text-xs tracking-widest text-pink-300 uppercase">
            Premium Learning Games
          </p>

          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            Learn Tagalog Through Games 🎮
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Improve vocabulary, grammar, and memory with interactive premium
            learning games designed to make Tagalog fun and addictive.
          </p>
        </div>

        {/* GAMES GRID */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-pink-500/40"
            >
              {/* ICON */}

              <div className="mb-5 inline-flex rounded-2xl bg-pink-500/10 p-4 text-pink-400">
                {game.icon}
              </div>

              {/* TITLE */}

              <h2 className="mb-3 text-2xl font-bold">{game.title}</h2>

              {/* DESCRIPTION */}

              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                {game.description}
              </p>

              {/* BUTTON */}

              <Link
                to={game.path}
                className="inline-flex items-center justify-center rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-pink-600"
              >
                {game.button}
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION */}

        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            More Games Coming Soon 🚀
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Listening challenges, pronunciation battles, daily streak rewards,
            and AI-powered Tagalog learning experiences are on the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;

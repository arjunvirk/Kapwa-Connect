import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left */}

        <div>
          <Link to="/">
            <h2 className="text-center text-xl font-semibold md:text-left">
              Kapwa Connect
            </h2>
          </Link>

          <p className="mt-3 max-w-md text-center text-sm leading-6 text-gray-600 md:text-left">
            A modern Filipino learning platform designed to help students learn,
            practice, and grow with confidence.
          </p>
        </div>

        {/* Right */}

        <div className="flex justify-center gap-6 text-sm text-gray-600 md:justify-start">
          <Link to="/login" className="transition hover:text-black">
            Sign In
          </Link>

          <Link to="/register" className="transition hover:text-black">
            Register
          </Link>

          <Link to="/about" className="transition hover:text-black">
            About
          </Link>
        </div>
      </div>

      {/* Bottom */}

      <div className="mx-auto mt-10 max-w-6xl border-t pt-6 text-center text-sm text-gray-500">
        © 2026 RHO Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

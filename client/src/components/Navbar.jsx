import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";

import { logout } from "../actions/userActions.js";
import { googleLogout } from "@react-oauth/google";

import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let currentUser = userInfo;

  try {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser && storedUser !== "undefined") {
      currentUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.log("Invalid user data in localStorage");
    localStorage.removeItem("userInfo");
  }

  const logoutHandler = () => {
    toast("See you again 👋");

    googleLogout();

    localStorage.removeItem("userInfo");

    dispatch(logout());

    setMenuOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 px-4 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between">
          {/* Logo */}

          <Link to="/">
            <h1 className="text-xl font-semibold tracking-tight">
              Kapwa Connect
            </h1>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/about" className="transition hover:opacity-70">
              About
            </Link>
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">
            {/* Desktop User Navigation */}

            {currentUser && (
              <div className="hidden items-center gap-5 md:flex">
                <Link
                  to={
                    currentUser.role === "teacher"
                      ? "/teacher/dashboard"
                      : "/student/dashboard"
                  }
                  className="transition hover:opacity-70"
                >
                  Dashboard
                </Link>

                {currentUser.role === "student" && (
                  <Link to="/games" className="transition hover:opacity-70">
                    Games
                  </Link>
                )}

                <Link to="/profile" className="transition hover:opacity-70">
                  {currentUser.name}
                </Link>

                <button
                  onClick={logoutHandler}
                  className="cursor-pointer rounded-xl border px-4 py-2 text-sm transition hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Desktop Logged Out */}

            {!currentUser && (
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  to="/teacher/login"
                  className="rounded-xl border px-4 py-2 text-sm transition hover:bg-gray-100"
                >
                  Teacher Portal
                </Link>

                <Link
                  to="/login"
                  className="rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:opacity-90"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}

            <button
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer md:hidden"
            >
              <FiMenu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}

        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>

          <button onClick={() => setMenuOpen(false)} className="cursor-pointer">
            <FiX size={26} />
          </button>
        </div>

        {/* Sidebar Links */}

        <div className="flex flex-col gap-5 text-lg">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="transition hover:translate-x-1"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="transition hover:translate-x-1"
          >
            About
          </Link>

          {!currentUser && (
            <>
              <Link
                to="/teacher/login"
                onClick={() => setMenuOpen(false)}
                className="transition hover:translate-x-1"
              >
                Teacher Portal
              </Link>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="transition hover:translate-x-1"
              >
                Sign In
              </Link>
            </>
          )}

          {currentUser && (
            <>
              <Link
                to={
                  currentUser.role === "teacher"
                    ? "/teacher/dashboard"
                    : "/student/dashboard"
                }
                onClick={() => setMenuOpen(false)}
                className="transition hover:translate-x-1"
              >
                Dashboard
              </Link>

              {currentUser.role === "student" && (
                <Link
                  to="/games"
                  onClick={() => setMenuOpen(false)}
                  className="transition hover:translate-x-1"
                >
                  Games
                </Link>
              )}

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="transition hover:translate-x-1"
              >
                Profile
              </Link>

              <button
                onClick={logoutHandler}
                className="mt-4 cursor-pointer rounded-xl border px-4 py-3 text-left text-sm transition hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

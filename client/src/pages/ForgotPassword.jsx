import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { forgotPassword } from "../actions/userActions";

import { USER_FORGOT_PASSWORD_RESET } from "../constants/userConstants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const forgotPasswordState = useSelector((state) => state.forgotPassword);

  const { loading, success, error, message } = forgotPasswordState;

  useEffect(() => {
    return () => {
      dispatch({
        type: USER_FORGOT_PASSWORD_RESET,
      });
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl border p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Forgot Password</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email and we will send you a reset link
          </p>
        </div>

        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-black">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;

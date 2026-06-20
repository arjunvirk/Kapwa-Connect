import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../actions/userActions";

import { USER_RESET_PASSWORD_RESET } from "../constants/userConstants";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token } = useParams();

  const resetPasswordState = useSelector((state) => state.resetPassword);

  const { loading, success, error, message } = resetPasswordState;

  useEffect(() => {
    if (success) {
      toast.success(message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    if (error) {
      toast.error(error);
    }

    return () => {
      dispatch({
        type: USER_RESET_PASSWORD_RESET,
      });
    };
  }, [success, error, message, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!password) {
      toast.warning("Please enter a new password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(resetPassword(token, password));
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl border p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Reset Password</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
            <p className="mt-2 text-xs text-gray-500">
              Password must be at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Updating Password..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link to="/login" className="font-medium text-black">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;

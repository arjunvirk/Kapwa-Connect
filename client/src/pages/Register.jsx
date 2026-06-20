import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";
import { toast } from "sonner";
const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // ADD THIS HERE

  const [verificationPending, setVerificationPending] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  // REGISTER SUCCESS

  useEffect(() => {
    if (userInfo?.message) {
      toast.success("Verification email sent. Please verify your email.");

      setVerificationPending(true);
    }
  }, [userInfo]);

  // CHECK VERIFICATION STATUS

  useEffect(() => {
    if (!verificationPending) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/check-verification?email=${email}`,
          {
            method: "GET",

            credentials: "include",
          },
        );

        const data = await response.json();

        if (data.verified) {
          localStorage.setItem("userInfo", JSON.stringify(data.user));

          toast.success("Email verified successfully");

          clearInterval(interval);

          navigate("/student/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [verificationPending, email, navigate]);

  // ERROR HANDLING

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(register(name, email, password));
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl border p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Create Account</h1>

          <p className="mt-2 text-sm text-gray-500">Join Kapwa Connect today</p>
        </div>
        {verificationPending && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            Verification email sent. Waiting for verification...
          </div>
        )}
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-black">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

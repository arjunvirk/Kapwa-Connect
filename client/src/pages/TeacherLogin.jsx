import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GoogleAuthButton from "../components/GoogleAuthButton";

const TeacherLogin = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (user) {
      if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        {/* Heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Teacher Login</h1>

          <p className="mt-2 text-sm text-gray-500">
            Continue with Google to access your teacher dashboard
          </p>
        </div>

        {/* Divider */}

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500">
              Teacher Authentication
            </span>
          </div>
        </div>

        {/* Google Login */}

        <div className="flex justify-center">
          <GoogleAuthButton role="teacher" />
        </div>

        {/* Bottom Text */}

        <p className="mt-8 text-center text-sm text-gray-500">
          Only approved teachers should access this area.
        </p>
      </div>
    </section>
  );
};

export default TeacherLogin;

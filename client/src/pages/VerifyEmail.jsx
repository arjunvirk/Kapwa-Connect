import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/verify-email/${token}`,
          {
            method: "GET",

            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Verification failed");
        }

        // SAVE USER INFO

        localStorage.setItem("userInfo", JSON.stringify(data));

        toast.success("Email verified successfully");

        // REDIRECT TO DASHBOARD

        setTimeout(() => {
          navigate("/student/dashboard");
        }, 1500);
      } catch (error) {
        toast.error(error.message);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold">Verifying Email</h1>

        <p className="mt-4 leading-7 text-gray-600">
          Please wait while we verify your email address...
        </p>
      </div>
    </section>
  );
};

export default VerifyEmail;

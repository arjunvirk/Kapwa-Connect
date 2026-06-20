import { GoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

import { toast } from "sonner";

const GoogleAuthButton = ({ role }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/google-auth`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            credential: credentialResponse.credential,
            role,
          }),
        },
      );

      const data = await res.json();

      // HANDLE BACKEND ERRORS

      if (!res.ok || !data.success) {
        toast.error(data.message || "Google login failed");

        return;
      }

      // UPDATE REDUX

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      // SAVE USER

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Google login successful");

      // REDIRECT

      if (data.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google Login Failed")}
      useOneTap={false}
    />
  );
};

export default GoogleAuthButton;

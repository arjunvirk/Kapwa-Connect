import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { toast } from "sonner";

const Profile = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);

  const { loading, error, user } = userProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = userUpdateProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (updateError) {
      toast.error(updateError);
    }
  }, [error, updateError]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.warning("Name and email are required");
      return;
    }

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(
      updateUserProfile({
        name,
        email,
        password,
      }),
    );
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl border p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">My Profile</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account information
          </p>
        </div>

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
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3 text-gray-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />

            <p className="mt-2 text-xs text-gray-500">
              You can update your password anytime. Leave blank if you don't
              want to change it.
            </p>
          </div>

          <button
            type="submit"
            disabled={updateLoading}
            className="w-full cursor-pointer rounded-lg bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {updateLoading ? "Saving Changes..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;

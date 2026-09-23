import { useState } from "react";
import { toast } from "react-toastify";
import { getMe } from "../services/authService";

const UserProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

  const initials = (profile?.name || user?.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleToggle = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (!nextOpen) {
      return;
    }

    try {
      setLoading(true);
      const response = await getMe();
      setProfile(response.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load your profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-label="Open user profile"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white transition hover:bg-blue-700"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          {loading ? (
            <p className="text-sm text-gray-500">Loading profile...</p>
          ) : (
            <>
              <p className="font-bold text-gray-900">{profile?.name}</p>
              <p className="mt-1 break-words text-sm text-gray-500">
                {profile?.email}
              </p>
              <div className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-600">
                <p>Phone: {profile?.phone || "Not provided"}</p>
                <p className="mt-1 capitalize">Role: {profile?.role}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
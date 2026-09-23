import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/profile/ProfileCard";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="flex min-h-[calc(100vh-160px)] justify-center bg-gray-50 px-4 py-10">
      <ProfileCard user={user} />
    </main>
  );
};

export default Profile
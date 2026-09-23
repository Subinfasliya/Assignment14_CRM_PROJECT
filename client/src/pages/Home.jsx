import { useAuth } from "../context/AuthContext";
import UserProfileMenu from "../components/UserProfileMenu";
import FeatureSection from "../components/home/FeatureSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {user && (
          <div className="mx-auto flex max-w-7xl justify-end px-4 pt-4 sm:px-6 lg:px-8">
            <UserProfileMenu user={user} />
          </div>
        )}
        <HeroSection />
      </section>

      <FeatureSection />
      <HowItWorksSection />
    </div>
  );
};

export default Home;

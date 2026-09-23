import { Link } from "react-router";
import DashboardPreview from "./DashboardPreview";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Smart Customer Management
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Manage Your
              <span className="text-blue-600"> Customers</span>
              <br />
              With Ease
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Manage customer information, track relationships, organize your
              data and improve your business workflow from one simple CRM
              dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Login
              </Link>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

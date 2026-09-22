
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid w-full items-center gap-12 lg:grid-cols-2">

            {/* Hero Content */}
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Smart Customer Management
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Manage Your
                <span className="text-blue-600">
                  {" "}Customers
                </span>
                <br />
                With Ease
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                Manage customer information, track relationships,
                organize your data and improve your business workflow
                from one simple CRM dashboard.
              </p>

              {/* Buttons */}
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

            {/* Hero Dashboard Preview */}
            <div className="relative">

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-6">

                {/* Fake Dashboard Header */}
                <div className="flex items-center justify-between border-b pb-4">

                  <div>
                    <h3 className="font-bold text-gray-800">
                      CRM Dashboard
                    </h3>

                    <p className="text-xs text-gray-500">
                      Customer Overview
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-full bg-blue-100" />

                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-3">

                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-gray-500">
                      Customers
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-800">
                      1,248
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-gray-500">
                      Active
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-800">
                      986
                    </p>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-3">
                    <p className="text-xs text-gray-500">
                      New
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-800">
                      124
                    </p>
                  </div>

                </div>

                {/* Fake Table */}
                <div className="mt-5 overflow-hidden rounded-lg border">

                  <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500">
                    <span>Customer</span>
                    <span>Email</span>
                    <span>Status</span>
                  </div>

                  {[
                    ["John Smith", "john@example.com", "Active"],
                    ["Sarah Wilson", "sarah@example.com", "Active"],
                    ["Michael Brown", "michael@example.com", "New"],
                    ["David Miller", "david@example.com", "Active"],
                  ].map(([name, email, status]) => (
                    <div
                      key={email}
                      className="grid grid-cols-3 border-t px-4 py-3 text-xs"
                    >
                      <span className="font-medium text-gray-700">
                        {name}
                      </span>

                      <span className="truncate text-gray-500">
                        {email}
                      </span>

                      <span>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
                          {status}
                        </span>
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FEATURES
      ========================== */}
      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Features
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need to Manage Customers
            </h2>

            <p className="mt-4 text-gray-600">
              A simple CRM system designed to help you organize
              customer information and manage relationships efficiently.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Feature 1 */}
            <div className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                👥
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Customer Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Create, update, view and delete customer information
                from one place.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl">
                🔍
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Search & Filter
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Quickly find customers using name, email, phone
                number or role.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-2xl">
                📊
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Dashboard
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get a quick overview of your customers and business
                data.
              </p>

            </div>


            {/* Feature 4 */}
            <div className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl">
                🔐
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Secure Access
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Authentication and role-based access help protect
                your CRM data.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              How It Works
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple Customer Management
            </h2>

          </div>


          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {/* Step 1 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Create an Account
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Register your account and securely login to the
                CRM system.
              </p>

            </div>


            {/* Step 2 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Manage Customers
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Add, update, search and organize your customer
                information.
              </p>

            </div>


            {/* Step 3 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Grow Your Business
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Use organized customer data to improve your
                customer relationships.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}
      <section className="bg-blue-600 py-20">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Manage Your Customers?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Start organizing your customer information and
            managing your relationships more efficiently.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/register"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-blue-400 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;


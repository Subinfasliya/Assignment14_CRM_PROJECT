import { Link } from "react-router";

const StatusPage = ({ code, title, message, actionLabel = "Back to Home" }) => {
  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {code}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-lg text-gray-600">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {actionLabel}
        </Link>
      </div>
    </main>
  );
};

export default StatusPage;

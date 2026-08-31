import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen border">
      <h1 className="text-4xl font-bold mb-3">403 - Forbidden</h1>

      <p className="text-lg mb-3">
        You don't have permission to access this page.
      </p>

      <p>Back to <Link to={"/"} className="text-blue-500 font-semibold underline">Home</Link></p>
    </div>
  );
};

export default Unauthorized;
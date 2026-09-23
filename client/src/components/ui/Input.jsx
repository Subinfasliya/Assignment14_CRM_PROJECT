const Input = ({ className = "", size = "default", ...props }) => {
  const sizeClass = size === "compact" ? "py-2.5" : "py-3";

  return (
    <input
      className={`w-full rounded-lg border border-gray-300 px-4 ${sizeClass} outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 ${className}`}
      {...props}
    />
  );
};

export default Input;

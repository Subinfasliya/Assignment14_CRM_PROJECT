const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">

      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={!hasPreviousPage}
        className="w-full rounded-lg border px-4 py-2.5 font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        ← Previous
      </button>

      <div className="text-sm text-gray-600">
        Page{" "}
        <span className="font-semibold text-gray-900">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900">
          {totalPages}
        </span>
      </div>

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={!hasNextPage}
        className="w-full rounded-lg border px-4 py-2.5 font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        Next →
      </button>

    </div>
  );
};

export default Pagination;
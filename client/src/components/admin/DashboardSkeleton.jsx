import Skeleton from "../ui/Skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6" aria-label="Loading dashboard">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-24 rounded-xl" />
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="grid grid-cols-5 gap-4 bg-gray-100 px-4 py-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} className="h-4" />
          ))}
        </div>
        <div className="space-y-3 p-4">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((cell) => (
                <Skeleton key={cell} className="h-5" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;

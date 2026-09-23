import Skeleton from "../ui/Skeleton";

const HomeSkeleton = () => {
  return (
    <main className="min-h-screen bg-white" aria-label="Loading home page">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-80px)] items-center gap-12 lg:grid-cols-2">
            <div>
              <Skeleton className="h-8 w-56" />
              <Skeleton className="mt-6 h-20 w-full max-w-xl" />
              <Skeleton className="mt-6 h-20 w-full max-w-xl" />
              <div className="mt-8 flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-24" />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-20" />
                ))}
              </div>
              <Skeleton className="mt-5 h-48 w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mx-auto h-10 w-80 max-w-full" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-44" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeSkeleton;

const DashboardStats = ({ pagination }) => {
  const stats = [
    { label: "Total Customers", value: pagination.totalUsers },
    { label: "Current Page", value: pagination.currentPage },
    { label: "Total Pages", value: pagination.totalPages },
  ];

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Dashboard statistics">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <h2 className="mt-2 text-2xl font-bold">{stat.value}</h2>
        </article>
      ))}
    </section>
  );
};

export default DashboardStats;

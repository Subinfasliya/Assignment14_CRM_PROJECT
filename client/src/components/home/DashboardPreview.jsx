const stats = [
  { label: "Customers", value: "1,248", className: "bg-blue-50" },
  { label: "Active", value: "986", className: "bg-green-50" },
  { label: "New", value: "124", className: "bg-purple-50" },
];

const customers = [
  ["John Smith", "john@example.com", "Active"],
  ["Sarah Wilson", "sarah@example.com", "Active"],
  ["Michael Brown", "michael@example.com", "New"],
  ["David Miller", "david@example.com", "Active"],
];

const DashboardPreview = () => {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-bold text-gray-800">CRM Dashboard</h3>
            <p className="text-xs text-gray-500">Customer Overview</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100" />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-lg p-3 ${stat.className}`}>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border">
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500">
            <span>Customer</span>
            <span>Email</span>
            <span>Status</span>
          </div>

          {customers.map(([name, email, status]) => (
            <div key={email} className="grid grid-cols-3 border-t px-4 py-3 text-xs">
              <span className="font-medium text-gray-700">{name}</span>
              <span className="truncate text-gray-500">{email}</span>
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
  );
};

export default DashboardPreview;

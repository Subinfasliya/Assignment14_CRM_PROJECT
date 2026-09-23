const features = [
  {
    icon: "👥",
    title: "Customer Management",
    description: "Create, update, view and delete customer information from one place.",
    color: "bg-blue-100",
  },
  {
    icon: "🔍",
    title: "Search & Filter",
    description: "Quickly find customers using name, email, phone number or role.",
    color: "bg-green-100",
  },
  {
    icon: "📊",
    title: "Dashboard",
    description: "Get a quick overview of your customers and business data.",
    color: "bg-purple-100",
  },
  {
    icon: "🔐",
    title: "Secure Access",
    description: "Authentication and role-based access help protect your CRM data.",
    color: "bg-orange-100",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Features
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to Manage Customers
          </h2>
          <p className="mt-4 text-gray-600">
            A simple CRM system designed to help you organize customer
            information and manage relationships efficiently.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

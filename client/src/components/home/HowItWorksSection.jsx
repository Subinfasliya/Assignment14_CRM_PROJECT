const steps = [
  {
    title: "Create an Account",
    description: "Register your account and securely login to the CRM system.",
  },
  {
    title: "Manage Customers",
    description: "Add, update, search and organize your customer information.",
  },
  {
    title: "Grow Your Business",
    description: "Use organized customer data to improve your customer relationships.",
  },
];

const HowItWorksSection = () => {
  return (
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
          {steps.map((step, index) => (
            <article key={step.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

const AuthPageShell = ({ title, subtitle, children, footer }) => {
  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-md sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </header>

        {children}
        {footer}
      </section>
    </main>
  );
};

export default AuthPageShell;

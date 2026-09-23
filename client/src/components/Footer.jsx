const Footer = () => {
  return (
    <footer className="border-t border-gray-300 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6">
        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} User Management. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6">
        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} User Management. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="/terms" className="hover:text-blue-500 hover:underline">
            Terms & Conditions
          </a>

          <a href="/privacy" className="hover:text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

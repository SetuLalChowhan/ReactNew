import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600 font-normal">
          © {new Date().getFullYear()} - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

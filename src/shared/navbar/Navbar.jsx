/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import logoImg from "@/assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <img
              src={logoImg}
              alt="SchoolReview"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
              <span>About Us</span>
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </button>

            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
              Log in
            </button>

            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-1">
              <button className="px-5 py-2.5 rounded-xl bg-[#0084FF] border border-gray-200 hover:bg-[#0074e0] text-white text-sm font-medium transition-all duration-200 cursor-pointer">
                For Schools
              </button>

              <button className="px-5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-200 text-gray-800 text-sm font-medium transition-all duration-200 cursor-pointer">
                For Teachers
              </button>
            </div>

            <button
              aria-label="Language selector"
              className="p-2 text-gray-600 bg-gray-50 rounded-full hover:text-gray-900 transition-colors cursor-pointer"
            >
              <Globe className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-100 space-y-3"
          >
            <button className="flex items-center justify-between w-full py-2 text-left text-base font-medium text-gray-700">
              <span>About Us</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button className="block w-full py-2 text-left text-base font-medium text-gray-700">
              Log in
            </button>

            <div className="pt-2 flex flex-col gap-2.5">
              <button className="w-full py-3 rounded-full bg-[#0084FF] text-white text-sm font-semibold shadow-sm text-center">
                For Schools
              </button>
              <button className="w-full py-3 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold text-center">
                For Teachers
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

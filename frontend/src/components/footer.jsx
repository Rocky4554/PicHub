import React from "react";
import { MapPin, Mail, Contact } from "lucide-react";
import ContactForm from "./ContactForm";
import { useState } from "react";
import { X,MessageCircle} from "lucide-react";

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset";
  };
  // Social media SVG icons
  const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );

  return (
    <>
      <footer className="relative bg-black text-white overflow-hidden">
        {/* Blue lighting effect from bottom right */}
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full opacity-20 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

        {/* Blue lighting effect from top left */}
        <div className="absolute top-70 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full opacity-15 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Content container */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left section - Main heading */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Create amazing Images
                <br />
                very fast using
                <br />
                <span className="text-white">Image AI.</span>
              </h2>
            </div>

            {/* Right section - Contact info */}
            <div className="space-y-6 lg:justify-self-end">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                 
                  {/* <ContactButton/> */}

                  <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                    <p className="font-semibold tracking-wide text-gray-100 text-sm sm:text-base mb-4">
                      Get in Touch
                    </p>
                    <button
                      onClick={openContactModal}
                      className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base"
                    >
                      <MessageCircle className="w-4 h-4 transition-transform group-hover:rotate-12" />
                      <span>Contact Us</span>
                      <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/raunak-kumar54/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://github.com/Rocky4554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-800 my-6 sm:my-8"></div>

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Navigation links */}
            <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-8">
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Home
              </a>
              <a
                href="/sample"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Dashboard
              </a>
              <a
                href="/saved"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Gallery
              </a><a
                href="/sign-in"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Sign In 
              </a>
              <a
                href="/sign-up"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Sign Up
              </a>

            </nav>

            {/* Copyright */}
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-right">
             © 2025. Built with ❤️ and caffeine — Raunak. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeContactModal}
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-6xl bg-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-in flex flex-col"
            style={{ maxHeight: "95vh" }}
          >
            {/* Close Button */}
            <button
              onClick={closeContactModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Scrollable Contact Form Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

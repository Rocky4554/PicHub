
import React from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <div className="w-13 h-13 bg-gradient-to-r from-black-500 to-stone-900 rounded-full flex items-center justify-center shadow-lg">
              <img
               src="/sample-images/bot2.png"
               alt="AI Logo"
              className="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
            />
            </div>
            <span className="text-white font-semibold text-xl drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110">
              Image AI
            </span>
          </div>
        </Link>
         
        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Conditional Dashboard/Get Started Button */}
          <SignedIn>
            <Link to="/sample" className="inline-block">
              <button className="flex items-center gap-2 bg-blue-600/90 hover:bg-blue-700 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10">
                Dashboard <ArrowRight />
              </button>
            </Link>
          </SignedIn>
          
          <SignedOut>
            <Link to="/sign-up" className="inline-block">
              <button className="flex items-center gap-2 bg-blue-600/90 hover:bg-blue-700 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-white/10">
                Get Started <ArrowRight />
              </button>
            </Link>
          </SignedOut>
                     
          {/* Sign In Button - only show when user is not logged in */}
          <SignedOut>
            <Link
              to="/sign-in"
              className="bg-green-600/90 hover:bg-green-700 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/25 border border-white/10 inline-block"
            >
              Sign In
            </Link>
          </SignedOut>
                     
          {/* Clerk user profile */}
          <div className="user-profile">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
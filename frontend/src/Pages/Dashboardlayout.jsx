
import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  User,
  Crown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/sample" },
    { name: "Saved Images", icon: Bookmark, path: "/saved" },
  ];

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-900 text-white">
      {/* Background animation */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-gray-900 overflow-hidden">
        <div
          className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          style={{ left: 100, top: 100 }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          style={{ right: 200, bottom: 200 }}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`relative h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Sidebar scrollable content */}
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2 p-4 border-b border-gray-800">
              <div className="w-13 h-13 bg-gradient-to-r from-black-500 to-stone-900 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="/sample-images/bot2.png"
                  alt="AI Logo"
                  className="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              {!sidebarCollapsed && (
                <span className="text-white font-semibold text-xl drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110">
                  Image AI
                </span>
              )}
            </div>
          </Link>

          <SignedIn>
            {!sidebarCollapsed && user && (
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center">
                    <UserButton />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {user?.fullName ||
                        user?.firstName ||
                        user?.username ||
                        "User"}
                    </div>
                    {user?.emailAddresses?.[0]?.emailAddress && (
                      <div className="text-xs text-gray-400">
                        {user.emailAddresses[0].emailAddress}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SignedIn>

          {/* Navigation */}
          <div className="p-2 flex-1">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link to={item.path} key={item.name}>
                  <button
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                      location.pathname === item.path
                        ? "bg-violet-700 text-white shadow-lg shadow-purple-600/25"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <item.icon size={sidebarCollapsed ? 22 : 20} />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </button>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-700 z-10"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;

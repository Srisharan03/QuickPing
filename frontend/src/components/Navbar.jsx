import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    // CHANGES: Replaced theme colors with explicit white and gray. Kept the blur effect.
    <header
      className="bg-white/80 border-b border-gray-200 fixed w-full top-0 z-40
    backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            {/* CHANGE: Replaced primary color with a neutral gray background. */}
            <div className="size-9 rounded-lg bg-gray-200 flex items-center justify-center">
              {/* CHANGE: Replaced primary text color with a dark gray. */}
              <MessageSquare className="w-5 h-5 text-gray-800" />
            </div>
            {/* CHANGE: Added specific text color and font. */}
            <h1 className="text-lg font-bold text-gray-900 font-sans">QuickPing</h1>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            {authUser && (
              <>
                {/* 
                  CHANGE: Removed all 'btn' classes and created a new, consistent style for nav links.
                  This style is now applied to Settings, Profile, and Logout for uniformity.
                */}
                <Link
                  to={"/settings"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                             text-gray-600 hover:bg-gray-100 hover:text-gray-800
                             transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <Link
                  to={"/profile"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                             text-gray-600 hover:bg-gray-100 hover:text-gray-800
                             transition-colors"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                             text-gray-600 hover:bg-gray-100 hover:text-gray-800
                             transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
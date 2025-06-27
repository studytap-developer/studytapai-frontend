

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User } from "lucide-react";

const Header = ({
  user,
  signOut,
  showDropdown,
  setShowDropdown,
  setShowProfileForm,
  showProfileForm,
  profileUpdated,
  setProfileUpdated,
  setMobileNumber,
  mobileNumber,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="w-full px-4 py-3 border-b border-gray-700 bg-gray-800 flex justify-between items-center"
    >
      <h1 className="text-xl font-semibold text-white">Chat</h1>

      {/* Right profile section */}
      <div className="flex items-center gap-4 relative">
        {user && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowDropdown(!showDropdown);
              setShowProfileForm(false);
              setProfileUpdated(false);
            }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-600"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}

            {/* Show name, email, and mobile number */}
            <div className="text-left">
              <p className="text-white text-sm">{user.displayName}</p>
              <p className="text-gray-400 text-xs">{user.email}</p>
               {mobileNumber && (
                <p className="text-gray-400 text-xs">📱 {mobileNumber}</p>
              )} 
            </div>
          </motion.button>
        )}

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-md p-3 w-48 z-50"
            >
              <button
                onClick={signOut}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

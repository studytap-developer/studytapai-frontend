import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, LogOut } from 'lucide-react';

const ChatHeader = ({
  user,
  isMobile,
  setMobileMenuOpen,
  signOut,
  mobileNumber,
  setMobileNumber,
  saveProfile,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const handleSaveProfile = async () => {
    await saveProfile();
    setProfileUpdated(true);
    setTimeout(() => {
      setShowDropdown(false);
      setShowProfileForm(false);
      setProfileUpdated(false);
    }, 2000);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="w-full px-3 sm:px-4 py-3 border-b border-gray-700 bg-gray-800 flex justify-between items-center"
    >
      {isMobile && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 mr-3"
        >
          <Menu size={20} />
        </motion.button>
      )}

      <h1 className="text-lg sm:text-xl font-semibold text-white">Chat</h1>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setShowDropdown(!showDropdown);
            setShowProfileForm(false);
            setProfileUpdated(false);
          }}
          className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
        >
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-600"
          />
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-14 w-56 sm:w-64 bg-white text-black rounded-xl shadow-2xl z-50"
            >
              {!showProfileForm ? (
                <>
                  <button
                    onClick={() => setShowProfileForm(true)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-sm sm:text-base"
                  >
                    <User size={16} />
                    Update Profile
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600 flex items-center gap-3 text-sm sm:text-base"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold">Name</p>
                    <p className="text-gray-700 text-sm">
                      {user.displayName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-gray-700 text-sm break-all">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[6-9][0-9]{0,9}$/.test(value) || value === '') {
                          setMobileNumber(value);
                        }
                      }}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter Indian mobile number"
                    />
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    Save
                  </button>

                  {profileUpdated && (
                    <p className="text-green-600 text-sm text-center">
                      Profile updated successfully!
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default ChatHeader;

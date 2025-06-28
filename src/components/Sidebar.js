import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Menu,
  X,
  MessageSquare,
  Search,
  Settings,
  Crown,
  Trash2,
} from 'lucide-react';

interface SidebarProps {
  user: any;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  chatSessions: Array<{ id: string; title: string }>;
  sessionId: string;
  startNewChat: () => void;
  loadSession: (id: string, token: string) => void;
  deleteSession: (id: string) => void;
  setShowPlansModal: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  chatSessions,
  sessionId,
  startNewChat,
  loadSession,
  deleteSession,
  setShowPlansModal,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMobileMenuOpen(false);
    }
  }, [isMobile, setSidebarCollapsed, setMobileMenuOpen]);

  const handleStartNewChat = () => {
    startNewChat();
    if (isMobile) setMobileMenuOpen(false);
  };

  const handleLoadSession = async (id: string) => {
    const token = await user.getIdToken();
    await loadSession(id, token);
    localStorage.setItem("activeSessionId", id);
    if (isMobile) setMobileMenuOpen(false);
  };

  return (
    <motion.aside
      id="mobile-sidebar"
      initial={{ x: isMobile ? -300 : 0 }}
      animate={{
        x: isMobile ? (mobileMenuOpen ? 0 : -300) : 0,
        width: isMobile ? "280px" : (sidebarCollapsed ? "60px" : "280px"),
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`bg-gray-800 text-white border-r border-gray-700 flex flex-col relative overflow-hidden ${
        isMobile ? 'fixed left-0 top-0 h-full z-50' : 'relative'
      }`}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col h-full p-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4"
        >
          <AnimatePresence mode="wait">
            {(!sidebarCollapsed || isMobile) ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    StudyTap AI
                  </h2>
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(55, 65, 81)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (isMobile) {
                      setMobileMenuOpen(false);
                    } else {
                      setSidebarCollapsed(true);
                    }
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(55, 65, 81)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  <Menu size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* New Chat Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.02, backgroundColor: "rgb(55, 65, 81)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartNewChat}
          className="flex items-center justify-center gap-3 px-3 py-2.5 mb-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 group"
        >
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Plus size={16} />
          </motion.div>
          <AnimatePresence>
            {(!sidebarCollapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-medium whitespace-nowrap text-sm"
              >
                New Chat
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Navigation Icons (Collapsed State) */}
        <AnimatePresence>
          {sidebarCollapsed && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 mb-4"
            >
              {[
                { icon: MessageSquare, tooltip: "Chats" },
                { icon: Search, tooltip: "Search" },
                { icon: Settings, tooltip: "Settings" },
              ].map(({ icon: Icon, tooltip }, index) => (
                <motion.button
                  key={tooltip}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(55, 65, 81)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full p-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 flex justify-center relative group"
                  title={tooltip}
                >
                  <Icon size={16} />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                  >
                    {tooltip}
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence>
            {(!sidebarCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide px-1">
                  Recent Chats
                </h3>
                <motion.div
                  className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <AnimatePresence>
                    {chatSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ backgroundColor: "rgb(55, 65, 81)" }}
                        className={`flex justify-between items-center p-2.5 rounded-lg cursor-pointer transition-all duration-300 group ${
                          sessionId === session.id
                            ? "bg-blue-600"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <span
                          onClick={() => handleLoadSession(session.id)}
                          className="text-sm truncate flex-1 pr-2"
                        >
                          {session.title || "Untitled Chat"}
                        </span>
                        <motion.button
                          whileHover={{
                            scale: 1.1,
                            color: "rgb(239, 68, 68)",
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2">
          {/* View Plans Button */}
          <AnimatePresence>
            {(!sidebarCollapsed || isMobile) ? (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgb(55, 65, 81)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPlansModal(true)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600"
              >
                <Crown size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">View plans</span>
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgb(55, 65, 81)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPlansModal(true)}
                className="w-full p-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 flex justify-center relative group border border-gray-600"
                title="View plans"
              >
                <Crown size={16} className="text-yellow-400" />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                >
                  View plans
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Footer */}
        <div className="text-center text-[10px] text-gray-500 border-t border-gray-700 pt-2 mt-4">
          <AnimatePresence>
            {(!sidebarCollapsed || isMobile) ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Powered by{" "}
                <span className="text-white font-medium">
                  Shree Gajanana Enterprises LLP
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[8px]"
              >
                SGE
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

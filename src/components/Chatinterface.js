import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Plus,
  Menu,
  X,
  MessageSquare,
  Search,
  Settings,
  Crown,
  Phone,
  User,
  LogOut,
  GraduationCap,
  Volume2,
  Square,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Zap,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  user: any;
  signOut: () => void;
}

const LoadingDots = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, signOut }) => {
  // State management
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [chatSessions, setChatSessions] = useState<Array<{ id: string; title: string }>>([]);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [likedMessages, setLikedMessages] = useState<Record<number, boolean>>({});
  const [dislikedMessages, setDislikedMessages] = useState<Record<number, boolean>>({});

  const chatRef = useRef<HTMLDivElement>(null);

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
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
  }, [isMobile]);

  // Mock functions
  const handlePayment = () => {
    console.log('Processing payment...');
    setShowModal(false);
    setShowPlansModal(false);
  };

  const saveProfile = async () => {
    console.log('Saving profile...');
  };

  const startNewChat = () => {
    setChatStarted(true);
    setMessages([]);
    setInput('');
    if (isMobile) setMobileMenuOpen(false);
  };

  const loadSession = async (id: string, token: string) => {
    console.log('Loading session:', id);
    if (isMobile) setMobileMenuOpen(false);
  };

  const deleteSession = (id: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== id));
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const aiResponse = { sender: 'ai', text: 'This is a mock response to your question.' };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && mobileMenuOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, mobileMenuOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex bg-gray-900 relative overflow-hidden"
    >
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                🚀 Unlock Unlimited Access
              </h2>
              <p className="mb-6 text-gray-600 text-center text-sm sm:text-base">
                You've reached your free limit. Subscribe to continue your
                learning journey!
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
                >
                  Pay ₹999/month
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-sm sm:text-base"
                >
                  Maybe Later
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plans Modal */}
      <AnimatePresence>
        {showPlansModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white text-black rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Choose Your Plan
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPlansModal(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </motion.button>
                </div>

                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                  {/* Free Plan */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-gray-200 rounded-2xl p-4 sm:p-6 relative"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">Free</h3>
                      <div className="text-3xl sm:text-4xl font-bold mb-2">₹0</div>
                      <p className="text-gray-600 text-sm sm:text-base">Limited access</p>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      <li className="flex items-center gap-3 text-sm sm:text-base">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                        </div>
                        <span>2 questions for free trial</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm sm:text-base">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Basic AI responses</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm sm:text-base">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-400">Priority support</span>
                      </li>
                    </ul>
                    <button className="w-full py-2 sm:py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-600 cursor-not-allowed text-sm sm:text-base">
                      Current Plan
                    </button>
                  </motion.div>

                  {/* Pro Plan */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-blue-500 rounded-2xl p-4 sm:p-6 relative bg-gradient-to-br from-blue-50 to-purple-50"
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                        <Crown size={12} className="sm:w-3.5 sm:h-3.5" />
                        Most Popular
                      </div>
                    </div>
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Pro
                      </h3>
                      <div className="text-3xl sm:text-4xl font-bold mb-2">₹999</div>
                      <p className="text-gray-600 text-sm sm:text-base">per month</p>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {[
                        'Unlimited questions',
                        'Advanced AI responses',
                        'Priority support',
                        'Custom study plans'
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm sm:text-base">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Zap size={10} className="sm:w-3 sm:h-3 text-white" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
                    >
                      Upgrade to Pro
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
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
            onClick={startNewChat}
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
                            onClick={async () => {
                              const token = await user.getIdToken();
                              await loadSession(session.id, token);
                              localStorage.setItem(
                                "activeSessionId",
                                session.id
                              );
                            }}
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

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-900 min-w-0">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full px-3 sm:px-4 py-3 border-b border-gray-700 bg-gray-800 flex justify-between items-center"
        >
          {/* Mobile Menu Button */}
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

          {/* Title */}
          <h1 className="text-lg sm:text-xl font-semibold text-white">Chat</h1>

          {/* Right Profile Section */}
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

            {/* Dropdown */}
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
                            if (
                              /^[6-9][0-9]{0,9}$/.test(value) ||
                              value === ""
                            ) {
                              setMobileNumber(value);
                            }
                          }}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Enter Indian mobile number"
                        />
                      </div>

                      <button
                        onClick={async () => {
                          await saveProfile();
                          setProfileUpdated(true);
                          setTimeout(() => {
                            setShowDropdown(false);
                            setShowProfileForm(false);
                            setProfileUpdated(false);
                          }, 2000);
                        }}
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

        {/* Chat Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 custom-scrollbar"
        >
          {messages.length === 0 && !chatStarted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center min-h-[60vh] sm:min-h-[70vh] w-full"
            >
              <div className="text-center flex flex-col items-center justify-center px-4">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0, -1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4"
                >
                  <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-2">
                  Ready to help you study!
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4">Ask me anything to get started</p>
                <button
                  onClick={startNewChat}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-sm sm:text-base"
                >
                  Try Now
                </button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl max-w-[85%] sm:max-w-[75%] shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "bg-gray-800 text-gray-100 border border-gray-700"
                  }`}
                >
                  <div className="prose prose-invert max-w-none text-sm sm:text-base">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                  {/* Icons under AI messages only */}
                  {msg.sender !== "user" && (
                    <div className="mt-3 flex flex-col items-start gap-2 text-sm text-gray-400">
                      <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
                        {/* Speak/Stop */}
                        {speakingIndex !== idx ? (
                          <button
                            onClick={() => {
                              window.speechSynthesis.cancel();
                              const utterance = new SpeechSynthesisUtterance(msg.text);
                              utterance.onend = () => setSpeakingIndex(null);
                              window.speechSynthesis.speak(utterance);
                              setSpeakingIndex(idx);
                            }}
                            title="Speak"
                            className="hover:text-white transition"
                          >
                            <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              window.speechSynthesis.cancel();
                              setSpeakingIndex(null);
                            }}
                            title="Stop Speaking"
                            className="text-yellow-400 hover:text-red-500 transition"
                          >
                            <Square size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        )}

                        {/* Copy */}
                        <button
                          onClick={() => navigator.clipboard.writeText(msg.text)}
                          title="Copy"
                          className="hover:text-white transition"
                        >
                          <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>

                        {/* Like */}
                        <button
                          onClick={() => {
                            setLikedMessages((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }));
                            setDislikedMessages((prev) => ({
                              ...prev,
                              [idx]: false,
                            }));
                          }}
                          title="Like"
                          className={`transition hover:text-green-400 ${
                            likedMessages[idx] ? "text-green-500" : ""
                          }`}
                        >
                          <ThumbsUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>

                        {/* Dislike */}
                        <button
                          onClick={() => {
                            setDislikedMessages((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }));
                            setLikedMessages((prev) => ({
                              ...prev,
                              [idx]: false,
                            }));
                          }}
                          title="Dislike"
                          className={`transition hover:text-red-400 ${
                            dislikedMessages[idx] ? "text-red-500" : ""
                          }`}
                        >
                          <ThumbsDown size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gray-800 border border-gray-700">
                <LoadingDots />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Footer */}
        {chatStarted && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-3 sm:p-4 lg:p-6 border-t border-gray-700 bg-gray-800"
          >
            <div className="flex items-center gap-2 sm:gap-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-700 border border-gray-600 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  placeholder="Ask your question..."
                  disabled={loading}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </motion.footer>
        )}
      </main>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgb(75, 85, 99) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgb(75, 85, 99);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgb(107, 114, 128);
        }

        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ChatInterface;
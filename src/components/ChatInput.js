import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ChatInput = ({
  chatStarted,
  input,
  setInput,
  loading,
  sendMessage,
  handleKeyPress,
}) => {
  if (!chatStarted) return null;

  return (
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
  );
};

export default ChatInput;

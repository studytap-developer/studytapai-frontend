import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Volume2,
  Square,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

const ChatMessages = ({
  messages,
  chatStarted,
  loading,
  startNewChat,
  speakingIndex,
  setSpeakingIndex,
  likedMessages,
  setLikedMessages,
  dislikedMessages,
  setDislikedMessages,
  chatRef,
}) => {
  return (
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
                ease: 'easeInOut',
              }}
              className="mb-4"
            >
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-2">
              Ready to help you study!
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Ask me anything to get started
            </p>
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl max-w-[85%] sm:max-w-[75%] shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}
            >
              <div className="prose prose-invert max-w-none text-sm sm:text-base">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {msg.sender !== 'user' && (
                <div className="mt-3 flex flex-col items-start gap-2 text-sm text-gray-400">
                  <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
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

                    <button
                      onClick={() => navigator.clipboard.writeText(msg.text)}
                      title="Copy"
                      className="hover:text-white transition"
                    >
                      <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>

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
                        likedMessages[idx] ? 'text-green-500' : ''
                      }`}
                    >
                      <ThumbsUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>

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
                        dislikedMessages[idx] ? 'text-red-500' : ''
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
  );
};

export default ChatMessages;

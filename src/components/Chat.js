import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Volume2, Square, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import LoadingDots from "./LoadingDots"; // adjust import if needed
import { GraduationCap } from "lucide-react";


const Chat = ({
  chatRef,
  messages,
  loading,
  speakingIndex,
  setSpeakingIndex,
  likedMessages,
  dislikedMessages,
  setLikedMessages,
  setDislikedMessages,
}) => {
  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
    >
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center min-h-[70vh] w-full"
        >
          <div className="text-center flex flex-col items-center justify-center">
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
              <GraduationCap className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              Ready to help you study!
            </h3>
            <p className="text-gray-500">Ask me anything to get started</p>
          </div>
          <button> Try now </button>
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
              whileHover={{ scale: 1.02 }}
              className={`px-6 py-4 rounded-2xl max-w-[75%] shadow-lg ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-gray-800 text-gray-100 border border-gray-700"
              }`}
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {msg.sender !== "user" && (
                <div className="mt-3 flex flex-col items-start gap-2 text-sm text-gray-400">
                  <div className="flex gap-4 items-center">
                    {/* Speak */}
                    {speakingIndex !== idx ? (
                      <button
                        onClick={() => {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(
                            msg.text
                          );
                          utterance.onend = () => setSpeakingIndex(null);
                          window.speechSynthesis.speak(utterance);
                          setSpeakingIndex(idx);
                        }}
                        title="Speak"
                        className="hover:text-white transition"
                      >
                        <Volume2 size={18} />
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
                        <Square size={18} />
                      </button>
                    )}

                    {/* Copy */}
                    <button
                      onClick={() => navigator.clipboard.writeText(msg.text)}
                      title="Copy"
                      className="hover:text-white transition"
                    >
                      <Copy size={18} />
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
                      <ThumbsUp size={18} />
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
                      <ThumbsDown size={18} />
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
          <div className="px-6 py-4 rounded-2xl bg-gray-800 border border-gray-700">
            <LoadingDots />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chat;

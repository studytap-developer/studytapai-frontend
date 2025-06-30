import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import PaymentModal from './PaymentModal';
import PlansModal from './PlansModal';

const ChatInterface = ({
  user,
  signOut,
  messages,
  input,
  setInput,
  loading,
  chatStarted,
  setChatStarted,
  showModal,
  setShowModal,
  showPlansModal,
  setShowPlansModal,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  isMobile,
  chatSessions,
  sessionId,
  startNewChat,
  sendMessage,
  handleKeyPress,
  loadSession,
  deleteSession,
  handlePayment,
  mobileNumber,
  setMobileNumber,
  saveProfile,
  speakingIndex,
  setSpeakingIndex,
  likedMessages,
  setLikedMessages,
  dislikedMessages,
  setDislikedMessages,
  chatRef,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex bg-gray-900"
    >
      {/* Payment Modal */}
      <PaymentModal
        showModal={showModal}
        setShowModal={setShowModal}
        handlePayment={handlePayment}
      />

      {/* Plans Modal */}
      <PlansModal
        showPlansModal={showPlansModal}
        setShowPlansModal={setShowPlansModal}
        handlePayment={handlePayment}
      />

      {/* Sidebar */}
      <Sidebar
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        chatSessions={chatSessions}
        sessionId={sessionId}
        startNewChat={startNewChat}
        loadSession={loadSession}
        deleteSession={deleteSession}
        setShowPlansModal={setShowPlansModal}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-900">
        {/* Header */}
        <ChatHeader
          user={user}
          isMobile={isMobile}
          setMobileMenuOpen={setMobileMenuOpen}
          signOut={signOut}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          saveProfile={saveProfile}
        />

        {/* Chat Messages */}
        <ChatMessages
          messages={messages}
          chatStarted={chatStarted}
          loading={loading}
          startNewChat={startNewChat}
          speakingIndex={speakingIndex}
          setSpeakingIndex={setSpeakingIndex}
          likedMessages={likedMessages}
          setLikedMessages={setLikedMessages}
          dislikedMessages={dislikedMessages}
          setDislikedMessages={setDislikedMessages}
          chatRef={chatRef}
        />

        {/* Chat Input */}
        <ChatInput
          chatStarted={chatStarted}
          input={input}
          setInput={setInput}
          loading={loading}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
        />
      </main>

      {/* Custom Scrollbar Styles */}
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
      `}</style>
    </motion.div>
  );
};

export default ChatInterface;

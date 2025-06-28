import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Zap } from 'lucide-react';

interface PlansModalProps {
  showPlansModal: boolean;
  setShowPlansModal: (show: boolean) => void;
  handlePayment: () => void;
}

const PlansModal: React.FC<PlansModalProps> = ({
  showPlansModal,
  setShowPlansModal,
  handlePayment,
}) => {
  return (
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
  );
};

export default PlansModal;
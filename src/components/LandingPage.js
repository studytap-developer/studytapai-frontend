// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import FullScreenModal from './FullScreenModal';
// import AnimatedBackground from './AnimatedBackground';

// const LandingPage = ({ signInWithGoogle }) => {
//   const [showPrivacyModal, setShowPrivacyModal] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
//       {/* Animated Background */}
//       <AnimatedBackground />

//       {/* Main Content */}
//       <div className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           className="text-center max-w-5xl w-full"
//         >
//           {/* Heading & Subheading */}
//           <motion.div
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.8, ease: "backOut" }}
//             className="mb-6 sm:mb-8 lg:mb-12"
//           >
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent leading-tight">
//               StudyTap AI
//             </h1>

//             {/* Responsive Text Blocks */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-6 md:px-10"
//             >
//               <span className="block sm:hidden">
//                 Learn smart. StudyTap on mobile.
//               </span>
//               <span className="hidden sm:block md:hidden">
//                 Boost your learning with AI guidance.
//               </span>
//               <span className="hidden md:block lg:hidden">
//                 Personal assistant for students. Ask. Learn. Repeat.
//               </span>
//               <span className="hidden lg:block">
//                 Welcome to StudyTap AI — your intelligent, responsive, and always-available study companion built for every B.Tech student.
//               </span>
//             </motion.p>
//           </motion.div>

//           {/* Sign in Button */}
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.6 }}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={signInWithGoogle}
//             className="px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg lg:text-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto"
//           >
//             Sign in with Google
//           </motion.button>
//           <p className="text-red-500 sm:text-green-500 md:text-blue-500 lg:text-yellow-500">
//   Resize me!
// </p>

//         </motion.div>
//       </div>

//       {/* Footer */}
//       <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-transparent">
//         <div className="max-w-5xl mx-auto text-center">
//           <div className="h-0.5 w-2/3 sm:w-1/3 mx-auto mb-4 bg-gray-700 rounded-full" />

//           <div className="text-xs sm:text-sm text-gray-400 space-y-3">
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
//               <button
//                 onClick={() => setShowPrivacyModal(true)}
//                 className="hover:underline hover:text-white transition px-2 py-1"
//               >
//                 Privacy Policy
//               </button>
//               <span className="hidden sm:inline">|</span>
//               <button
//                 onClick={() => setShowTermsModal(true)}
//                 className="hover:underline hover:text-white transition px-2 py-1"
//               >
//                 Terms & Conditions
//               </button>
//             </div>
//             <p className="text-xs sm:text-sm leading-relaxed">
//               Powered by{" "}
//               <span className="font-semibold text-white">
//                 Shree Gajanana Enterprises LLP
//               </span>
//             </p>
//           </div>
//         </div>
//       </footer>

//       {/* Modals */}
//       {showPrivacyModal && (
//         <FullScreenModal
//           title="Privacy Policy"
//           onClose={() => setShowPrivacyModal(false)}
//         />
//       )}
//       {showTermsModal && (
//         <FullScreenModal
//           title="Terms & Conditions"
//           onClose={() => setShowTermsModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import FullScreenModal from "./FullScreenModal";
import AnimatedBackground from "./AnimatedBackground";

const LandingPage = ({ signInWithGoogle }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center w-full max-w-5xl"
        >
          {/* Heading */}
          <h1 className="text-9xl sm:text-5xl md:text-9xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent leading-tight">
            StudyTap AI
          </h1>

          {/* Subheading - responsive */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className=" md:text-1xl lg:text-2xl sm:text-4xl  text-white mb-8"
          >
            Your intelligent study companion
          </motion.p>

          <button
             onClick={signInWithGoogle}
            className="text-base px-4 py-2 sm:text-2xl sm:px-10 sm:py-5 md:text-3xl md:px-12 md:py-6 lg:text-lg lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto"
          >
            Sign in with Google
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      {/* <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <div className="h-0.5 w-2/3 sm:w-1/3 mx-auto mb-4 bg-gray-700 rounded-full" />
          <div className="text-xs sm:text-sm text-gray-400 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:underline hover:text-white transition px-2 py-1"
              >
                Privacy Policy
              </button>
              <span className="hidden sm:inline">|</span>
              <button
                onClick={() => setShowTermsModal(true)}
                className="hover:underline hover:text-white transition px-2 py-1"
              >
                Terms & Conditions
              </button>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Powered by{" "}
              <span className="font-semibold text-white">
                Shree Gajanana Enterprises LLP
              </span>
            </p>
          </div>
        </div>
      </footer> */}

      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-transparent">
        <div className="max-w-6xl mx-auto text-center">
          {/* Divider */}
          <div className="h-0.5 w-3/4 sm:w-1/2 lg:w-1/3 mx-auto mb-6 bg-gray-700 rounded-full" />

          {/* Footer Content */}
          <div className="md:text-4xl  lg:text-sm text-gray-400 space-y-4">
            {/* Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:underline hover:text-white transition px-2 py-1"
              >
                Privacy Policy.
              </button>
              <span className="hidden sm:inline text-gray-500">|</span>
              <button
                onClick={() => setShowTermsModal(true)}
                className="hover:underline hover:text-white transition px-2 py-1"
              >
                .Terms & Conditions.
              </button>
            </div>

            {/* Branding */}
            <p className="md:text-2xl lg:text-sm leading-relaxed">
              Powered by{" "}
              <span className="font-semibold text-white">
                Shree Gajanana Enterprises LLP
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPrivacyModal && (
        <FullScreenModal
          title="Privacy Policy"
          onClose={() => setShowPrivacyModal(false)}
        />
      )}
      {showTermsModal && (
        <FullScreenModal
          title="Terms & Conditions"
          onClose={() => setShowTermsModal(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;

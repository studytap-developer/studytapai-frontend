// import React from 'react';
// import { motion } from 'framer-motion';
// import { X } from 'lucide-react';

// const FullScreenModal = ({ title, onClose }) => {
//   const getContent = () => {
//     if (title === 'Privacy Policy') {
//       return (
//         <div className="space-y-6">
//           <section>
//             <h3 className="text-xl font-semibold mb-3 text-blue-400">Information We Collect</h3>
//             <p className="text-gray-300 leading-relaxed">
//               We collect information you provide directly to us, such as when you create an account, 
//               use our services, or contact us for support. This may include your name, email address, 
//               and study preferences.
//             </p>
//           </section>
//           <section>
//             <h3 className="text-xl font-semibold mb-3 text-blue-400">How We Use Your Information</h3>
//             <p className="text-gray-300 leading-relaxed">
//               We use the information we collect to provide, maintain, and improve our services, 
//               personalize your experience, and communicate with you about our services.
//             </p>
//           </section>
//           <section>
//             <h3 className="text-xl font-semibold mb-3 text-blue-400">Data Security</h3>
//             <p className="text-gray-300 leading-relaxed">
//               We implement appropriate security measures to protect your personal information 
//               against unauthorized access, alteration, disclosure, or destruction.
//             </p>
//           </section>
//         </div>
//       );
//     } else {
//       return (
//         <div className="space-y-6">
//           <section>
//             <h3 className="text-xl font-semibold mb-3 text-blue-400">Acceptance of Terms</h3>
//             <p className="text-gray-300 leading-relaxed">
//               By accessing and using StudyTap AI, you accept and agree to be bound by the terms 
//               and provision of this agreement.
//             </p>
//           </section>
//           <section>
//             <h3 className="text-xl font-semibold mb-3 text-blue-400">Use License</h3>
//             <p className="text-gray-300 leading-relaxed">
//               Permission is granted to temporarily use StudyTap AI for personal, non-commercial 
//               transitory viewing only. This is the grant of a license, not a transfer of title.
//             </p>
//           </section>
//           <section>
//             <h3 className="text-xl font-semibold mb-3 text-blue-400">Service Modifications</h3>
//             <p className="text-gray-300 leading-relaxed">
//               StudyTap AI reserves the right to modify or discontinue the service at any time 
//               without notice. We shall not be liable to you or any third party for any modification, 
//               suspension, or discontinuance of the service.
//             </p>
//           </section>
//         </div>
//       );
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
//           <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-slate-700 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//           {getContent()}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default FullScreenModal;



import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Shield,
  Eye,
  Lock,
  Users,
  Database,
  AlertCircle,
  FileText,
  CheckCircle,
  User,
  BookOpen,
  Gavel,
} from "lucide-react";

const FullScreenModal = ({ title, onClose }) => {
  const getContent = () => {
    if (title === "Privacy Policy") {
      return (
        <div className="space-y-10 text-gray-300">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-500 w-6 h-6" />
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
          </div>
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
              <Eye className="w-5 h-5 mr-2" /> Introduction
            </h3>
            <p>
              StudyTap AI ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
              <Database className="w-5 h-5 mr-2" /> Information We Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email, payment info, and preferences</li>
              <li>AI interaction data and usage analytics</li>
              <li>Device & session metadata (IP, browser, etc.)</li>
              <li>Log files and performance reports</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
              <Users className="w-5 h-5 mr-2" /> How We Use Your Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personalized assistance and service improvements</li>
              <li>Subscription and account management</li>
              <li>Communication and support</li>
              <li>Security and legal compliance</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
              <Lock className="w-5 h-5 mr-2" /> Data Security
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption and secure cloud infrastructure</li>
              <li>Access controls and regular audits</li>
              <li>Compliance with data protection laws</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Your Rights
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, delete, or export your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Contact Us
            </h3>
            <p>Email: studytapai@gmail.com</p>
            <p>
              Address: Shree Gajanana Enterprises LLP, D.No. 8-2-289/7, 3rd floor
              Road No-14, Banjara Hills, Hyderabad, 500034 Telangana
            </p>
          </section>
        </div>
      );
    }

    return (
      <div className="space-y-10 text-gray-300">
        <div className="flex items-center space-x-3">
          <FileText className="text-blue-500 w-6 h-6" />
          <h2 className="text-2xl font-bold">Terms & Conditions</h2>
        </div>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
            <User className="w-5 h-5 mr-2" /> Who We Are
          </h3>
          <p>
            StudyTap AI provides AI-powered academic support. These Terms govern
            your use of our platform.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" /> Using Our Services
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be 13+, with parental consent if under 18</li>
            <li>Don't misuse, reverse-engineer, or resell services</li>
            <li>Use legally and ethically</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
            <Gavel className="w-5 h-5 mr-2" /> Governing Law
          </h3>
          <p>
            These Terms are governed by Indian laws and subject to Hyderabad court
            jurisdiction.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" /> Disclaimer
          </h3>
          <p>
            StudyTap AI content is "as is" without warranty. We are not liable for
            outcomes based on AI outputs.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-blue-400">Contact Us</h3>
          <p>Email: studytapai@gmail.com</p>
        </section>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {getContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullScreenModal;

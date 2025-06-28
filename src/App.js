// // ====== bolt

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import {
//   Send,
//   Plus,
//   Trash2,
//   User,
//   LogOut,
//   Phone,
//   Menu,
//   X,
//   MessageSquare,
//   Settings,
//   Search,
//   Crown,
//   Zap,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import { Volume2, Copy, ThumbsUp, ThumbsDown, Square } from "lucide-react";
// import { GraduationCap } from "lucide-react";
// import { onAuthStateChanged } from "firebase/auth";
// import FullScreenModal from "./components/FullScreenModal";

// firebase.initializeApp({
//       apiKey: "AIzaSyCDm_1kQ-XJlf_EjpBatI2_oYWv7sofRzU",
//     authDomain: "sign-in-5fb04.firebaseapp.com",
//   //  authDomain: "studytapai.com",
//     projectId: "sign-in-5fb04",
//     storageBucket: "sign-in-5fb04.firebasestorage.app",
//     messagingSenderId: "840402243302",
//     appId: "1:840402243302:web:e0ccda8f866c8321b27527",
//     measurementId: "G-SLTQ77RJBR"
// });

// const auth = firebase.auth();

// const LoadingDots = () => (
//   <div className="flex space-x-1">
//     {[0, 1, 2].map((i) => (
//       <motion.div
//         key={i}
//         className="w-2 h-2 bg-gray-400 rounded-full"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.5, 1, 0.5],
//         }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//           delay: i * 0.2,
//         }}
//       />
//     ))}
//   </div>
// );

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [chatSessions, setChatSessions] = useState([]);
//   const [sessionId, setSessionId] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   // const [phoneNumber, setPhoneNumber] = useState("");
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [showPlansModal, setShowPlansModal] = useState(false);
//   const chatRef = useRef(null);
//   const [chatStarted, setChatStarted] = useState(false);

//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [profileUpdated, setProfileUpdated] = useState(false);

//   const [speakingIndex, setSpeakingIndex] = useState(null);
//   const [likedMessages, setLikedMessages] = useState({});
//   const [dislikedMessages, setDislikedMessages] = useState({});

//   const [showPrivacyModal, setShowPrivacyModal] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (person) => {
//       setUser(person || null);
//       if (person) {
//         const token = await person.getIdToken();
//         await fetchSessions(token);
//         const savedSessionId = localStorage.getItem("activeSessionId");
//         if (savedSessionId && savedSessionId !== "undefined") {
//           await loadSession(savedSessionId, token);
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const signInWithGoogle = async () => {
//     try {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       provider.setCustomParameters({
//         prompt: "select_account",
//       });

//       await auth.signInWithPopup(provider);
//     } catch (err) {
//       console.log("Sign-in error:", err);
//     }
//   };

//   const signOut = () => {
//     localStorage.removeItem("activeSessionId");
//     auth.signOut();
//   };

//   const fetchSessions = async (token) => {
//     try {
//       const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/chat/sessions", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setChatSessions(data);
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//     }
//   };

//   const loadSession = async (id, token) => {
//     if (!id || id === "undefined") {
//       localStorage.removeItem("activeSessionId");
//       setSessionId(null);
//       setMessages([]);
//       return;
//     }
//     try {
//       const res = await fetch(`https://ai-chatbot-1-sgup.onrender.com/chat/session/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) {
//         localStorage.removeItem("activeSessionId");
//         setSessionId(null);
//         setMessages([]);
//         return;
//       }
//       const data = await res.json();
//       setSessionId(id);
//       setMessages(data.messages || []);
//     } catch {
//       localStorage.removeItem("activeSessionId");
//       setSessionId(null);
//       setMessages([]);
//     }
//   };

//   const startNewChat = async () => {
//     if (!user) return;
//     const token = await user.getIdToken();
//     try {
//       const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/chat/start", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ prompt: "New Chat" }),
//       });
//       const data = await res.json();
//       setSessionId(data.session_id);
//       localStorage.setItem("activeSessionId", data.session_id);
//       setMessages([]);
//       await fetchSessions(token);

//       // ✅ this line shows the input bar
//       setChatStarted(true);
//     } catch (error) {
//       console.error("Error starting new chat:", error);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || !user || !sessionId || showModal) return;
//     const token = await user.getIdToken();
//     const isFirstMessage = messages.length === 0;
//     const newMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ question: input, session_id: sessionId }),
//       });
//       const data = await res.json();

//       if (data.error) {
//         if (data.error.includes("Free limit reached")) {
//           setShowModal(true);
//         } else {
//           setMessages((prev) => [...prev, { sender: "ai", text: data.error }]);
//         }
//       } else {
//         setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
//         if (isFirstMessage) {
//           await fetch(
//             `https://ai-chatbot-1-sgup.onrender.com/chat/session/${sessionId}/update-title`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({ title: input }),
//             }
//           );
//           setChatSessions((prev) =>
//             prev.map((s) => (s.id === sessionId ? { ...s, title: input } : s))
//           );
//         }
//       }
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "ai",
//           text: "❌ Error occurred while processing your request.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const handlePayment = async () => {
//     if (!user) return;
//     const token = await user.getIdToken();
//     try {
//       const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/subscribe/", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       const options = {
//         key: data.key_id,
//         subscription_id: data.subscription_id,
//         name: "Studytap AI",
//         description: "Monthly Unlimited Access",
//         handler: async () => {
//           await fetch("https://ai-chatbot-1-sgup.onrender.com/update-subscription/", {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setShowModal(false);
//           setShowPlansModal(false);
//           alert("🎉 Subscription activated!");
//         },
//         prefill: { name: user.displayName, email: user.email },
//         theme: { color: "#0f172a" },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error handling payment:", error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         const token = await firebaseUser.getIdToken();
//         try {
//           const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/get-profile", {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (!res.ok) {
//             console.error("Failed to fetch profile:", await res.text());
//             return;
//           }

//           const data = await res.json();
//           console.log("Fetched profile:", data);
//           setMobileNumber(data.phone || "");
//         } catch (error) {
//           console.error("Error fetching profile:", error);
//         }
//       }
//     });

//     return () => unsubscribe(); // cleanup on unmount
//   }, []);

//   const saveProfile = async () => {
//     if (!user) return;
//     const token = await user.getIdToken();
//     try {
//       const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/update-profile", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ phone: mobileNumber }),
//       });

//       if (res.ok) {
//         const result = await res.json();
//         console.log("Profile updated:", result);
//         setProfileUpdated(true);
//       }
//     } catch (error) {
//       console.error("Error saving profile:", error);
//     }
//   };

//   const deleteSession = async (sessionIdToDelete) => {
//     if (!user) return;
//     const token = await user.getIdToken();
//     try {
//       await fetch(`https://ai-chatbot-1-sgup.onrender.com/chat/session/${sessionIdToDelete}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setChatSessions(chatSessions.filter((s) => s.id !== sessionIdToDelete));
//       if (sessionId === sessionIdToDelete) {
//         setSessionId(null);
//         setMessages([]);
//         localStorage.removeItem("activeSessionId");
//       }
//     } catch (error) {
//       console.error("Error deleting session:", error);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
//         {/* Main Content */}
//         <div className="flex-grow flex flex-col justify-center items-center overflow-hidden relative">
//           {/* Animated Background */}
//           <div className="absolute inset-0 overflow-hidden">
//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-2 h-2 bg-white rounded-full opacity-20"
//                 initial={{
//                   x: Math.random() * window.innerWidth,
//                   y: Math.random() * window.innerHeight,
//                 }}
//                 animate={{
//                   y: [null, -100, window.innerHeight + 100],
//                   opacity: [0.2, 0.5, 0],
//                 }}
//                 transition={{
//                   duration: Math.random() * 3 + 2,
//                   repeat: Infinity,
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Welcome + Sign-in */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="text-center z-10"
//           >
//             <motion.div
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.8, ease: "backOut" }}
//               className="mb-8"
//             >
//               {/* <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> */}
//               <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white  to-blue-600 bg-clip-text text-transparent">
//                 StudyTap AI
//               </h1>
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//                 className="text-xl text-gray-300 mb-8 "
//               >
//                 Your intelligent study companion
//               </motion.p>
//             </motion.div>

//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               onClick={signInWithGoogle}
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg"
//             >
//               Sign in with Google
//             </motion.button>
//           </motion.div>
//         </div>

//         <div>
//           <footer className="text-center py-4 text-sm text-gray-400 z-10">
//             <div className="w-1/2 h-0.5 mx-auto mb-4 bg-gray-700 rounded-full" />

//             <div className="space-x-4">
//               <button
//                 onClick={() => setShowPrivacyModal(true)}
//                 className="hover:underline hover:text-white transition"
//               >
//                 Privacy Policy
//               </button>
//               <span>|</span>
//               <button
//                 onClick={() => setShowTermsModal(true)}
//                 className="hover:underline hover:text-white transition"
//               >
//                 Terms & Conditions
//               </button>
//               <p className="mb-1">
//                 Powered by{" "}
//                 <span className="font-semibold text-white">
//                   Shree Gajanana Enterprises LLP
//                 </span>
//               </p>
//             </div>
//           </footer>
//           {showPrivacyModal && (
//             <FullScreenModal
//               title="Privacy Policy"
//               onClose={() => setShowPrivacyModal(false)}
//             />
//           )}

//           {showTermsModal && (
//             <FullScreenModal
//               title="Terms & Conditions"
//               onClose={() => setShowTermsModal(false)}
//             />
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="h-screen flex bg-gray-900"
//     >
//       {/* Payment Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.7, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.7, opacity: 0 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//               className="bg-white text-black p-8 rounded-2xl shadow-2xl max-w-md mx-4"
//             >
//               <h2 className="text-2xl font-bold mb-4 text-center">
//                 🚀 Unlock Unlimited Access
//               </h2>
//               <p className="mb-6 text-gray-600 text-center">
//                 You've reached your free limit. Subscribe to continue your
//                 learning journey!
//               </p>
//               <div className="space-y-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handlePayment}
//                   className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//                 >
//                   Pay ₹999/month
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setShowModal(false)}
//                   className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
//                 >
//                   Maybe Later
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Plans Modal */}
//       <AnimatePresence>
//         {showPlansModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.7, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.7, opacity: 0 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//               className="bg-white text-black rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-8">
//                 <div className="flex justify-between items-center mb-8">
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Choose Your Plan
//                   </h2>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setShowPlansModal(false)}
//                     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <X size={24} />
//                   </motion.button>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-8">
//                   {/* Free Plan */}
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     className="border-2 border-gray-200 rounded-2xl p-6 relative"
//                   >
//                     <div className="text-center mb-6">
//                       <h3 className="text-2xl font-bold mb-2">Free</h3>
//                       <div className="text-4xl font-bold mb-2">₹0</div>
//                       <p className="text-gray-600">Limited access</p>
//                     </div>
//                     <ul className="space-y-3 mb-8">
//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
//                           <div className="w-2 h-2 bg-white rounded-full"></div>
//                         </div>
//                         <span>2 questions for free trial </span>
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
//                           <div className="w-2 h-2 bg-white rounded-full"></div>
//                         </div>
//                         <span>Basic AI responses</span>
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
//                           <div className="w-2 h-2 bg-white rounded-full"></div>
//                         </div>
//                         <span className="text-gray-400">Priority support</span>
//                       </li>
//                     </ul>
//                     <button className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-600 cursor-not-allowed">
//                       Current Plan
//                     </button>
//                   </motion.div>

//                   {/* Pro Plan */}
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     className="border-2 border-blue-500 rounded-2xl p-6 relative bg-gradient-to-br from-blue-50 to-purple-50"
//                   >
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
//                         <Crown size={14} />
//                         Most Popular
//                       </div>
//                     </div>
//                     <div className="text-center mb-6">
//                       <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         Pro
//                       </h3>
//                       <div className="text-4xl font-bold mb-2">₹999</div>
//                       <p className="text-gray-600">per month</p>
//                     </div>
//                     <ul className="space-y-3 mb-8">
//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                           <Zap size={12} className="text-white" />
//                         </div>
//                         <span>Unlimited questions</span>
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                           <Zap size={12} className="text-white" />
//                         </div>
//                         <span>Advanced AI responses</span>
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                           <Zap size={12} className="text-white" />
//                         </div>
//                         <span>Priority support</span>
//                       </li>

//                       <li className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                           <Zap size={12} className="text-white" />
//                         </div>
//                         <span>Custom study plans</span>
//                       </li>
//                     </ul>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handlePayment}
//                       className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//                     >
//                       Upgrade to Pro
//                     </motion.button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Profile Modal */}
//       <AnimatePresence>
//         {showProfileModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.7, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.7, opacity: 0 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//               className="bg-white text-black p-6 rounded-2xl shadow-2xl w-96 mx-4"
//             >
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Phone size={20} />
//                 Update Phone Number
//               </h2>

//               <div className="flex justify-end gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setShowProfileModal(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={saveProfile}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
//                 >
//                   Save
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Collapsible Sidebar */}
//       <motion.aside
//         initial={{ x: -300 }}
//         animate={{
//           x: 0,
//           width: sidebarCollapsed ? "60px" : "280px",
//         }}
//         transition={{
//           duration: 0.3,
//           ease: "easeInOut",
//           type: "spring",
//           stiffness: 300,
//           damping: 30,
//         }}
//         className="bg-gray-800 text-white border-r border-gray-700 flex flex-col relative overflow-hidden"
//       >
//         {/* Sidebar Content */}
//         <div className="flex flex-col h-full p-3">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="mb-4"
//           >
//             <AnimatePresence mode="wait">
//               {!sidebarCollapsed ? (
//                 <motion.div
//                   key="expanded"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center justify-between"
//                 >
//                   <div>
//                     <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                       StudyTap AI
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{
//                       scale: 1.1,
//                       backgroundColor: "rgb(55, 65, 81)",
//                     }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setSidebarCollapsed(true)}
//                     className="p-1.5 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                   >
//                     <X size={16} />
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="collapsed"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex justify-center"
//                 >
//                   <motion.button
//                     whileHover={{
//                       scale: 1.1,
//                       backgroundColor: "rgb(55, 65, 81)",
//                     }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setSidebarCollapsed(false)}
//                     className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//                   >
//                     <Menu size={16} />
//                   </motion.button>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* New Chat Button */}
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             whileHover={{ scale: 1.02, backgroundColor: "rgb(55, 65, 81)" }}
//             whileTap={{ scale: 0.98 }}
//             onClick={startNewChat}
//             className="flex items-center justify-center gap-3 px-3 py-2.5 mb-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 group"
//           >
//             <motion.div
//               whileHover={{ rotate: 90 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Plus size={16} />
//             </motion.div>
//             <AnimatePresence>
//               {!sidebarCollapsed && (
//                 <motion.span
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{ opacity: 1, width: "auto" }}
//                   exit={{ opacity: 0, width: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="font-medium whitespace-nowrap text-sm"
//                 >
//                   New Chat
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </motion.button>

//           {/* Navigation Icons (Collapsed State) */}
//           <AnimatePresence>
//             {sidebarCollapsed && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.3 }}
//                 className="space-y-2 mb-4"
//               >
//                 {[
//                   { icon: MessageSquare, tooltip: "Chats" },
//                   { icon: Search, tooltip: "Search" },
//                   { icon: Settings, tooltip: "Settings" },
//                 ].map(({ icon: Icon, tooltip }, index) => (
//                   <motion.button
//                     key={tooltip}
//                     whileHover={{
//                       scale: 1.1,
//                       backgroundColor: "rgb(55, 65, 81)",
//                     }}
//                     whileTap={{ scale: 0.9 }}
//                     className="w-full p-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 flex justify-center relative group"
//                     title={tooltip}
//                   >
//                     <Icon size={16} />
//                     <motion.div
//                       initial={{ opacity: 0, x: -10 }}
//                       whileHover={{ opacity: 1, x: 0 }}
//                       className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
//                     >
//                       {tooltip}
//                     </motion.div>
//                   </motion.button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Chat Sessions */}
//           <div className="flex-1 overflow-hidden">
//             <AnimatePresence>
//               {!sidebarCollapsed && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide px-1">
//                     Recent Chats
//                   </h3>
//                   <motion.div
//                     className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4, duration: 0.6 }}
//                   >
//                     <AnimatePresence>
//                       {chatSessions.map((session, index) => (
//                         <motion.div
//                           key={session.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: -20 }}
//                           transition={{ delay: index * 0.05, duration: 0.3 }}
//                           whileHover={{ backgroundColor: "rgb(55, 65, 81)" }}
//                           className={`flex justify-between items-center p-2.5 rounded-lg cursor-pointer transition-all duration-300 group ${
//                             sessionId === session.id
//                               ? "bg-blue-600"
//                               : "hover:bg-gray-700"
//                           }`}
//                         >
//                           <span
//                             onClick={async () => {
//                               const token = await user.getIdToken();
//                               await loadSession(session.id, token);
//                               localStorage.setItem(
//                                 "activeSessionId",
//                                 session.id
//                               );
//                             }}
//                             className="text-sm truncate flex-1 pr-2"
//                           >
//                             {session.title || "Untitled Chat"}
//                           </span>
//                           <motion.button
//                             whileHover={{
//                               scale: 1.1,
//                               color: "rgb(239, 68, 68)",
//                             }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               deleteSession(session.id);
//                             }}
//                             className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
//                           >
//                             <Trash2 size={14} />
//                           </motion.button>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Bottom Section */}
//           <div className="mt-auto space-y-2">
//             {/* View Plans Button */}
//             <AnimatePresence>
//               {!sidebarCollapsed ? (
//                 <motion.button
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   whileHover={{
//                     scale: 1.02,
//                     backgroundColor: "rgb(55, 65, 81)",
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setShowPlansModal(true)}
//                   className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600"
//                 >
//                   <Crown size={16} className="text-yellow-400" />
//                   <span className="text-sm font-medium">View plans</span>
//                 </motion.button>
//               ) : (
//                 <motion.button
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   whileHover={{
//                     scale: 1.1,
//                     backgroundColor: "rgb(55, 65, 81)",
//                   }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setShowPlansModal(true)}
//                   className="w-full p-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 flex justify-center relative group border border-gray-600"
//                   title="View plans"
//                 >
//                   <Crown size={16} className="text-yellow-400" />
//                   <motion.div
//                     initial={{ opacity: 0, x: -10 }}
//                     whileHover={{ opacity: 1, x: 0 }}
//                     className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
//                   >
//                     View plans
//                   </motion.div>
//                 </motion.button>
//               )}
//             </AnimatePresence>
//           </div>
//           {/* Sidebar Footer */}
//           <div className="text-center text-[10px] text-gray-500 border-t border-gray-700 pt-2 mt-4">
//             Powered by{" "}
//             {!sidebarCollapsed && (
//               <span className="text-white font-medium">
//                 Shree Gajanana Enterprises LLP
//               </span>
//             )}
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Chat Area */}
//       <main className="flex-1 flex flex-col bg-gray-900">
//         {/* Header */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="w-full px-4 py-3 border-b border-gray-700 bg-gray-800 flex justify-between items-center"
//         >
//           {/* Title */}
//           <h1 className="text-xl font-semibold text-white">Chat</h1>

//           {/* Right Profile Section */}
//           <div className="flex items-center gap-4 relative">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 setShowDropdown(!showDropdown);
//                 setShowProfileForm(false); // Reset
//                 setProfileUpdated(false);
//               }}
//               className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
//             >
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full border-2 border-gray-600"
//               />
//             </motion.button>

//             {/* Dropdown */}
//             <AnimatePresence>
//               {showDropdown && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95, y: 10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95, y: 10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 top-14 w-64 bg-white text-black rounded-xl shadow-2xl z-50"
//                 >
//                   {!showProfileForm ? (
//                     <>
//                       <button
//                         onClick={() => setShowProfileForm(true)}
//                         className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
//                       >
//                         <User size={16} />
//                         Update Profile
//                       </button>
//                       <button
//                         onClick={() => {
//                           signOut();
//                           setShowDropdown(false);
//                         }}
//                         className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600 flex items-center gap-3"
//                       >
//                         <LogOut size={16} />
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <div className="p-4 space-y-3">
//                       <div>
//                         <p className="text-sm font-semibold">Name</p>
//                         <p className="text-gray-700 text-sm">
//                           {user.displayName}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold">Email</p>
//                         <p className="text-gray-700 text-sm">{user.email}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-gray-700">
//                           Mobile Number
//                         </label>

//                         <input
//                           type="tel"
//                           inputMode="numeric"
//                           maxLength={10}
//                           value={mobileNumber}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (
//                               /^[6-9][0-9]{0,9}$/.test(value) ||
//                               value === ""
//                             ) {
//                               setMobileNumber(value);
//                             }
//                           }}
//                           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
//                           placeholder="Enter Indian mobile number"
//                         />
//                       </div>

//                       <button
//                         onClick={async () => {
//                           await saveProfile(); // ⬅️ actually write to backend
//                           setProfileUpdated(true);
//                           setTimeout(() => {
//                             setShowDropdown(false);
//                             setShowProfileForm(false);
//                             setProfileUpdated(false);
//                           }, 2000);
//                         }}
//                         className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700"
//                       >
//                         Save
//                       </button>

//                       {profileUpdated && (
//                         <p className="text-green-600 text-sm text-center">
//                           Profile updated successfully!
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.header>

//         {/* Chat Messages */}
//         <div
//           ref={chatRef}
//           className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
//         >
//           {messages.length === 0 && !chatStarted && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="flex justify-center items-center min-h-[70vh] w-full"
//             >
//               <div className="text-center flex flex-col items-center justify-center">
//                 <motion.div
//                   animate={{
//                     scale: [1, 1.05, 1],
//                     rotate: [0, 1, 0, -1, 0],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="mb-4"
//                 >
//                   <GraduationCap className="w-12 h-12 text-white" />
//                 </motion.div>

//                 <h3 className="text-2xl font-semibold text-gray-300 mb-2">
//                   Ready to help you study!
//                 </h3>
//                 <p className="text-gray-500">Ask me anything to get started</p>
//                 <button
//                   onClick={startNewChat}
//                   className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition mt-4"
//                 >
//                   Try Now
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           <AnimatePresence>
//             {messages.map((msg, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -20, scale: 0.95 }}
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   className={`px-6 py-4 rounded-2xl max-w-[75%] shadow-lg ${
//                     msg.sender === "user"
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
//                       : "bg-gray-800 text-gray-100 border border-gray-700"
//                   }`}
//                 >
//                   <div className="prose prose-invert max-w-none">
//                     <ReactMarkdown>{msg.text}</ReactMarkdown>
//                   </div>

//                   {/* Icons under AI messages only */}
//                   {msg.sender !== "user" && (
//                     <div className="mt-3 flex flex-col items-start gap-2 text-sm text-gray-400">
//                       <div className="flex gap-4 items-center">
//                         {/* 🔊 SPEAK */}
//                         {speakingIndex !== idx && (
//                           <button
//                             onClick={() => {
//                               window.speechSynthesis.cancel();
//                               const utterance = new SpeechSynthesisUtterance(
//                                 msg.text
//                               );
//                               utterance.onend = () => setSpeakingIndex(null);
//                               window.speechSynthesis.speak(utterance);
//                               setSpeakingIndex(idx);
//                             }}
//                             title="Speak"
//                             className="hover:text-white transition"
//                           >
//                             <Volume2 size={18} />
//                           </button>
//                         )}

//                         {/* 🔇 STOP */}
//                         {speakingIndex === idx && (
//                           <button
//                             onClick={() => {
//                               window.speechSynthesis.cancel();
//                               setSpeakingIndex(null);
//                             }}
//                             title="Stop Speaking"
//                             className="text-yellow-400 hover:text-red-500 transition"
//                           >
//                             <Square size={18} />
//                           </button>
//                         )}

//                         {/* 📋 COPY */}
//                         <button
//                           onClick={() =>
//                             navigator.clipboard.writeText(msg.text)
//                           }
//                           title="Copy"
//                           className="hover:text-white transition"
//                         >
//                           <Copy size={18} />
//                         </button>

//                         {/* 👍 LIKE */}
//                         <button
//                           onClick={() => {
//                             setLikedMessages((prev) => ({
//                               ...prev,
//                               [idx]: !prev[idx],
//                             }));
//                             setDislikedMessages((prev) => ({
//                               ...prev,
//                               [idx]: false,
//                             }));
//                           }}
//                           title="Like"
//                           className={`transition hover:text-green-400 ${
//                             likedMessages[idx] ? "text-green-500" : ""
//                           }`}
//                         >
//                           <ThumbsUp size={18} />
//                         </button>

//                         {/* 👎 DISLIKE */}
//                         <button
//                           onClick={() => {
//                             setDislikedMessages((prev) => ({
//                               ...prev,
//                               [idx]: !prev[idx],
//                             }));
//                             setLikedMessages((prev) => ({
//                               ...prev,
//                               [idx]: false,
//                             }));
//                           }}
//                           title="Dislike"
//                           className={`transition hover:text-red-400 ${
//                             dislikedMessages[idx] ? "text-red-500" : ""
//                           }`}
//                         >
//                           <ThumbsDown size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {loading && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex justify-start"
//             >
//               <div className="px-6 py-4 rounded-2xl bg-gray-800 border border-gray-700">
//                 <LoadingDots />
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {chatStarted && (
//           <motion.footer
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="p-6 border-t border-gray-700 bg-gray-800"
//           >
//             <div className="flex items-center gap-4 max-w-4xl mx-auto">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                   className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                   placeholder="Ask your question..."
//                   disabled={loading}
//                 />
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={sendMessage}
//                 disabled={loading || !input.trim()}
//                 className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//               >
//                 <Send size={20} />
//               </motion.button>
//             </div>
//           </motion.footer>
//         )}
//       </main>

//       <style jsx global>{`
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: rgb(75, 85, 99) transparent;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: rgb(75, 85, 99);
//           border-radius: 3px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background-color: rgb(107, 114, 128);
//         }
//       `}</style>
//     </motion.div>
//   );
// };

// export default App;


import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { useChatAPI } from './hooks/useChatAPI';
import { useProfile } from './hooks/useProfile';
import { usePayment } from './hooks/usePayment';

function App() {
  const { user, signInWithGoogle, signOut } = useFirebaseAuth();
  const { 
    messages, 
    chatSessions, 
    sessionId, 
    loading, 
    startNewChat, 
    sendMessage, 
    loadSession, 
    deleteSession 
  } = useChatAPI(user);
  const { mobileNumber, setMobileNumber, saveProfile } = useProfile(user);
  const { handlePayment } = usePayment(user);

  // Chat state
  const [input, setInput] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  
  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Message interaction state
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [likedMessages, setLikedMessages] = useState({});
  const [dislikedMessages, setDislikedMessages] = useState({});
  
  const chatRef = useRef(null);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && mobileMenuOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        if (sidebar && !sidebar.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, mobileMenuOpen]);

  const handleStartNewChat = async () => {
    const newSessionId = await startNewChat();
    if (newSessionId) {
      setChatStarted(true);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading || showModal) return;
    
    const messageText = input;
    setInput('');
    
    await sendMessage(messageText, () => setShowModal(true));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePaymentWithModalClose = async () => {
    await handlePayment();
    setShowModal(false);
    setShowPlansModal(false);
  };

  if (!user) {
    return <LandingPage signInWithGoogle={signInWithGoogle} />;
  }

  return (
    <ChatInterface
      user={user}
      signOut={signOut}
      messages={messages}
      input={input}
      setInput={setInput}
      loading={loading}
      chatStarted={chatStarted}
      setChatStarted={setChatStarted}
      showModal={showModal}
      setShowModal={setShowModal}
      showPlansModal={showPlansModal}
      setShowPlansModal={setShowPlansModal}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      isMobile={isMobile}
      chatSessions={chatSessions}
      sessionId={sessionId}
      startNewChat={handleStartNewChat}
      sendMessage={handleSendMessage}
      handleKeyPress={handleKeyPress}
      loadSession={loadSession}
      deleteSession={deleteSession}
      handlePayment={handlePaymentWithModalClose}
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
      saveProfile={saveProfile}
      speakingIndex={speakingIndex}
      setSpeakingIndex={setSpeakingIndex}
      likedMessages={likedMessages}
      setLikedMessages={setLikedMessages}
      dislikedMessages={dislikedMessages}
      setDislikedMessages={setDislikedMessages}
      chatRef={chatRef}
    />
  );
}

export default App;
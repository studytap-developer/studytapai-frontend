
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import { Send, Sun, Moon } from 'lucide-react';

// // ✅ Firebase config & initialization
// firebase.initializeApp({
//   apiKey: "AIzaSyCDm_1kQ-XJlf_EjpBatI2_oYWv7sofRzU",
//   authDomain: "sign-in-5fb04.firebaseapp.com",
//   projectId: "sign-in-5fb04",
//   storageBucket: "sign-in-5fb04.appspot.com",
//   messagingSenderId: "840402243302",
//   appId: "1:840402243302:web:e0ccda8f866c8321b27527",
//   measurementId: "G-SLTQ77RJBR",
// });

// const auth = firebase.auth();

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [messages, setMessages] = useState([
//     { sender: 'ai', text: 'Hi there! How can I help you today?' },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [theme, setTheme] = useState('light');

//   // Monitor auth state
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((person) => {
//       setUser(person || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Handle theme switch
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//     } catch (err) {
//       console.log("Sign-in error:", err);
//     }
//   };

//   const handleSignOut = () => {
//     auth.signOut();
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || !user) return;

//     const userMessage = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const token = await user.getIdToken();
//       const res = await fetch('http://127.0.0.1:8000/ask', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ question: input }),
//       });

//       const data = await res.json();
//       const botMessage = { sender: 'ai', text: data.answer || 'No answer returned.' };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { sender: 'ai', text: 'Error getting response.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   if (!user) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
//         <button
//           onClick={signInWithGoogle}
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Sign in with Google
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
//       {/* Sidebar */}
//       <aside className="hidden md:flex flex-col w-64 border-r shadow-sm dark:border-gray-700">
//         <div className="p-4 font-bold text-xl">Studytap AI</div>
//         <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
//           Hello, {user.displayName}
//         </div>
//         <div className="p-4">
//           <button
//             onClick={handleSignOut}
//             className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Main Chat Area */}
//       <main className="flex flex-col flex-1">
//         {/* Top Bar */}
//         <header className="p-4 bg-white shadow-sm border-b flex justify-between items-center dark:bg-gray-900 dark:border-gray-700">
//           <h1 className="text-lg font-semibold">Chat with AI</h1>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
//           </button>
//         </header>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-[80%] ${
//                   msg.sender === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="px-4 py-2 rounded-lg bg-gray-300 text-black max-w-[80%]">
//               Typing...
//             </div>
//           )}
//         </div>

//         {/* Chat Input */}
//         <footer className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Ask your question..."
//               className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
//             />
//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default App;



import React from 'react'

const Chatai = () => {
  return (
    <div>Chatai</div>
  )
}

export default Chatai
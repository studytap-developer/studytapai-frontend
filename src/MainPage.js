// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

// // ✅ Firebase Initialization
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyCDm_1kQ-XJlf_EjpBatI2_oYWv7sofRzU",
//     authDomain: "sign-in-5fb04.firebaseapp.com",
//     projectId: "sign-in-5fb04",
//     storageBucket: "sign-in-5fb04.firebasestorage.app",
//     messagingSenderId: "840402243302",
//     appId: "1:840402243302:web:e0ccda8f866c8321b27527",
//     measurementId: "G-SLTQ77RJBR"
//   });
// }

// const auth = firebase.auth();

// const MainPage = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Inject responsive styles
//     const style = document.createElement('style');
//     style.innerHTML = `
//       @media (max-width: 768px) {
//         .sidebar {
//           position: relative !important;
//           width: 100% !important;
//           height: auto !important;
//           border-right: none !important;
//           border-bottom: 1px solid #eee !important;
//           padding-top: 80px !important;
//         }
//         .main {
//           margin-left: 0 !important;
//           padding: 20px !important;
//         }
//         .footer-columns {
//           flex-direction: column !important;
//           gap: 20px !important;
//         }
//         .social-footer {
//           flex-direction: column !important;
//           gap: 10px;
//         }
//       }

//       @media (min-width: 769px) {
//         .sidebar {
//           width: 220px;
//           height: 100vh;
//         }
//         .main {
//           margin-left: 240px;
//         }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(person => {
//       setUser(person || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//     } catch (err) {
//       console.error("Sign-in error:", err);
//     }
//   };

    

//   const handleSignOut = () => {
//     auth.signOut();
//     setUser(null);
//   };

//   return (
//     <div style={{ display: 'flex', fontFamily: 'sans-serif', flexDirection: 'column' }}>
      
//       {/* Top Right Sign-In/Out */}
//       <div style={{
//         position: 'fixed',
//         top: '20px',
//         right: '20px',
//         zIndex: 1000,
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px'
//       }}>
//         {user ? (
//           <>
//             <img src={user.photoURL} alt="Profile" style={{ width: 40, borderRadius: '50%' }} />
//             <p style={{ fontSize: '14px' }}>{user.displayName}</p>
//             <button
//               onClick={handleSignOut}
//               style={{
//                 background: '#ef4444',
//                 color: 'white',
//                 border: 'none',
//                 padding: '8px 12px',
//                 borderRadius: '6px',
//                 cursor: 'pointer'
//               }}
//             >
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={signInWithGoogle}
//             style={{
//               background: '#2563eb',
//               color: 'white',
//               border: 'none',
//               padding: '8px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer'
//             }}
//           >
//             Sign In with Google
//           </button>
//         )}
//       </div>

//       {/* Sidebar */}
//       <aside className="sidebar" style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         padding: '20px',
//         borderRight: '1px solid #eee',
//         backgroundColor: 'white',
//         overflowY: 'auto',
//         zIndex: 10
//       }}>
//         <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>StudytapAI</h2>
//         <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//           <a href="#">Research</a>
//           <a href="#">Safety</a>
//           <a href="#">ChatGPT</a>
//           <a href="#">Sora</a>
//           <a href="#">API Platform</a>
//           <a href="#">For Business</a>
//           <a href="#">Stories</a>
//           <a href="#">Company</a>
//           <a href="#">News</a>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="main" style={{
//         padding: '40px',
//         backgroundColor: '#fafafa',
//         flex: 1,
//         marginTop: '0'
//       }}>
//         <p style={{ fontSize: '14px', color: '#666' }}>November 30, 2022 · <strong>Product</strong></p>
//         <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '20px 0' }}>Introducing StudytapAI</h1>

//         <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
//           <button style={{ padding: '10px 20px', backgroundColor: '#eee', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//             Try ChatGPT →
//           </button>
//           <a href="#" style={{ padding: '10px 20px', textDecoration: 'none', color: 'black', backgroundColor: '#eee', borderRadius: '5px' }}>
//             Download ChatGPT desktop &gt;
//           </a>
//           <a href="#" style={{ padding: '10px 20px', textDecoration: 'none', color: 'black', backgroundColor: '#eee', borderRadius: '5px' }}>
//             Learn about ChatGPT &gt;
//           </a>
//         </div>

//         <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
//           We’ve trained a model called ChatGPT which interacts in a conversational way...
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response.
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           We are excited to introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
//         </p>




//         <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
//           We’ve trained a model called ChatGPT which interacts in a conversational way...
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response.
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           We are excited to introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
//         </p>




//         <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
//           We’ve trained a model called ChatGPT which interacts in a conversational way...
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response.
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           We are excited to introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
//         </p>




//         <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
//           We’ve trained a model called ChatGPT which interacts in a conversational way...
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response.
//         </p>

//         <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
//           We are excited to introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
//         </p>

//         {/* Footer Section */}
//         {/* <footer style={{ borderTop: '1px solid #ccc', paddingTop: '40px', marginTop: '60px' }}>
//           <div className="footer-columns" style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             marginBottom: '20px',
//             gap: '30px'
//           }}>
//             <div>
//               <h4>ChatGPT</h4>
//               <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
//                 <li><a href="#">GPT-4o</a></li>
//                 <li><a href="#">GPT-4o mini</a></li>
//                 <li><a href="#">Sora</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4>Safety</h4>
//               <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
//                 <li><a href="#">Safety Approach</a></li>
//                 <li><a href="#">Security & Privacy</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4>API Platform</h4>
//               <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
//                 <li><a href="#">Platform Overview</a></li>
//                 <li><a href="#">Pricing</a></li>
//                 <li><a href="#">API login</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4>More</h4>
//               <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
//                 <li><a href="#">News</a></li>
//                 <li><a href="#">Stories</a></li>
//                 <li><a href="#">Help Center</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="social-footer" style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             borderTop: '1px solid #eee',
//             paddingTop: '20px',
//             fontSize: '14px',
//             color: '#666'
//           }}>
//             <div>
//               <span style={{ marginRight: '10px' }}>🔗</span>
//               <span style={{ marginRight: '10px' }}>🐦</span>
//               <span style={{ marginRight: '10px' }}>📷</span>
//               <span style={{ marginRight: '10px' }}>🎵</span>
//             </div>
//             <div>OpenAI © 2015–2025</div>
//           </div>
//         </footer> */}


//         <footer className="text-center py-4 border-t border-gray-800 text-gray-600 text-sm">
//             © {new Date().getFullYear()} Studytap AI. All rights reserved.
//           </footer> 
 

//       </main> 
//     </div>
//   );
// };

// export default MainPage;



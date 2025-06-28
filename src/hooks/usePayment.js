import { useEffect } from 'react';

export const usePayment = (user) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePayment = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/subscribe/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const options = {
        key: data.key_id,
        subscription_id: data.subscription_id,
        name: "Studytap AI",
        description: "Monthly Unlimited Access",
        handler: async () => {
          await fetch("https://ai-chatbot-1-sgup.onrender.com/update-subscription/", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("🎉 Subscription activated!");
        },
        prefill: {
          name: user.displayName,
          email: user.email,
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  return { handlePayment };
};

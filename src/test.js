const handlePayment = async () => {
  if (!user) return;
  const token = await user.getIdToken();

  try {
    const res = await fetch("http://localhost:8000/subscribe/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    const options = {
      key: data.key_id,
      subscription_id: data.subscription_id,
      name: "Studytap AI",
      description: "Access to premium content",
      handler: async function (response) {
        // Call backend to update subscription
        await fetch("http://localhost:8000/update-subscription/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Subscription activated!");
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment failed.");
  }
};

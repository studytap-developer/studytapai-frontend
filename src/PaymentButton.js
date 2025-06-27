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
    if (data.payment_link) {
      window.location.href = data.payment_link;
    } else {
      alert("Failed to get payment link.");
    }
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment failed.");
  }
};

import { useState, useEffect } from 'react';

export const useProfile = (user: any) => {
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/get-profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch profile:", await res.text());
        return;
      }

      const data = await res.json();
      setMobileNumber(data.phone || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch("https://ai-chatbot-1-sgup.onrender.com/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: mobileNumber }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Profile updated:", result);
        return true;
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    return false;
  };

  return {
    mobileNumber,
    setMobileNumber,
    saveProfile
  };
};
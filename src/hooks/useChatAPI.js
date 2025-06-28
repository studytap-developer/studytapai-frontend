import { useState, useEffect } from 'react';

export const useChatAPI = (user) => {
  const [messages, setMessages] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://ai-chatbot-1-sgup.onrender.com";

  useEffect(() => {
    if (user) {
      fetchSessions();
      const savedSessionId = localStorage.getItem("activeSessionId");
      if (savedSessionId && savedSessionId !== "undefined") {
        loadSession(savedSessionId);
      }
    }
  }, [user]);

  const fetchSessions = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/chat/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setChatSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const loadSession = async (id) => {
    if (!id || id === "undefined" || !user) {
      localStorage.removeItem("activeSessionId");
      setSessionId('');
      setMessages([]);
      return;
    }
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API_BASE}/chat/session/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem("activeSessionId");
        setSessionId('');
        setMessages([]);
        return;
      }
      const data = await res.json();
      setSessionId(id);
      setMessages(data.messages || []);
    } catch {
      localStorage.removeItem("activeSessionId");
      setSessionId('');
      setMessages([]);
    }
  };

  const startNewChat = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    try {
      const res = await fetch(`${API_BASE}/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: "New Chat" }),
      });
      const data = await res.json();
      setSessionId(data.session_id);
      localStorage.setItem("activeSessionId", data.session_id);
      setMessages([]);
      await fetchSessions();
      return data.session_id;
    } catch (error) {
      console.error("Error starting new chat:", error);
    }
  };

  const sendMessage = async (input, onShowModal) => {
    if (!input.trim() || !user || !sessionId) return;

    const token = await user.getIdToken();
    const isFirstMessage = messages.length === 0;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: input, session_id: sessionId }),
      });
      const data = await res.json();

      if (data.error) {
        if (data.error.includes("Free limit reached")) {
          onShowModal();
        } else {
          setMessages((prev) => [...prev, { sender: "ai", text: data.error }]);
        }
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
        if (isFirstMessage) {
          await fetch(`${API_BASE}/chat/session/${sessionId}/update-title`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: input }),
          });
          setChatSessions((prev) =>
            prev.map((s) =>
              s.id === sessionId ? { ...s, title: input } : s
            )
          );
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Error occurred while processing your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionIdToDelete) => {
    if (!user) return;
    const token = await user.getIdToken();
    try {
      await fetch(`${API_BASE}/chat/session/${sessionIdToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatSessions(chatSessions.filter((s) => s.id !== sessionIdToDelete));
      if (sessionId === sessionIdToDelete) {
        setSessionId('');
        setMessages([]);
        localStorage.removeItem("activeSessionId");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return {
    messages,
    setMessages,
    chatSessions,
    sessionId,
    loading,
    startNewChat,
    sendMessage,
    loadSession,
    deleteSession,
    fetchSessions,
  };
};

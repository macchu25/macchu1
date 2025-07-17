import React, { useState, useRef, useEffect } from "react";
// import axios from "axios"; // Nếu muốn dùng axios thay fetch

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

async function callGeminiAPI(message) {
  const body = {
    contents: [{ parts: [{ text: message }] }]
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Xin lỗi, tôi không hiểu."
    );
  } catch (e) {
    return "Đã xảy ra lỗi khi kết nối Gemini API.";
  }
}

const botAvatar = (
  <span style={{
    display: "inline-block",
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)",
    color: "#fff",
    textAlign: "center",
    lineHeight: "32px",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8
  }}>🤖</span>
);
const userAvatar = (
  <span style={{
    display: "inline-block",
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)",
    color: "#222",
    textAlign: "center",
    lineHeight: "32px",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8
  }}>🧑</span>
);

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages([...messages, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    setMessages(msgs => [...msgs, { from: "bot", text: "Đang trả lời..." }]);
    const reply = await callGeminiAPI(userMessage);
    setMessages(msgs => [
      ...msgs.slice(0, -1), // Xóa "Đang trả lời..."
      { from: "bot", text: reply }
    ]);
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 1, // thấp hơn
        right: 16,  // sát phải hơn
        zIndex: 1000,
        fontFamily: 'Segoe UI, Arial, sans-serif'
      }}
    >
      {!open && (
        <div style={{ position: "relative", display: "inline-block" }}>
       
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: -29,
              transform: "translateX(-50%)",
              fontSize: 36,
              color: "#1976d2",
              fontWeight: "bold",
              textShadow: "0 2px 8px #fff"
            }}
          >❓</span>
          {/* Nút dango */}
          <button
            onClick={() => setOpen(true)}
            style={{
              width: 132,
              height: 132,
              background: "transparent",
              border: "none",
              boxShadow: "none",
              borderRadius: 0,
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translateX(-20px)"
            }}
            className="dango-bounce-loop"
            title="Chat với bot"
          >
            <img src="/assets/dango.png" alt="chat icon" style={{ width: 114, height: 114, objectFit: "contain", display: "block" }} />
          </button>
        </div>
      )}
      {open && (
        <div style={{
          width: 350,
          height: 480,
          background: "#fff",
          border: "none",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.18)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}>
          <div style={{
            padding: 16,
            borderBottom: "1px solid #e3e3e3",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
            color: "#fff",
            fontSize: 18,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{display: 'flex', alignItems: 'center'}}>
              🤖 <span style={{marginLeft: 8}}>ChatBot</span>
            </span>
            <button style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 22,
              cursor: "pointer"
            }} onClick={() => setOpen(false)} title="Đóng">×</button>
          </div>
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              background: "#f7fafd"
            }}
            className="custom-chat-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: "flex",
                flexDirection: msg.from === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                margin: "10px 0"
              }}>
                {msg.from === "bot" ? botAvatar : userAvatar}
                <span
                  className="chat-bubble-bounce"
                  style={{
                    display: "inline-block",
                    background: msg.from === "user" ? "linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)" : "#e3f0fc",
                    color: msg.from === "user" ? "#222" : "#1976d2",
                    padding: "10px 16px",
                    borderRadius: 18,
                    maxWidth: 220,
                    fontSize: 15,
                    marginLeft: msg.from === "user" ? 0 : 6,
                    marginRight: msg.from === "user" ? 6 : 0,
                    boxShadow: msg.from === "user" ? "0 2px 8px #38f9d733" : "none",
                    whiteSpace: "pre-line"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{
            padding: 12,
            borderTop: "1px solid #e3e3e3",
            background: "#f7fafd",
            display: "flex",
            alignItems: "center"
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid #b3c6e0",
                fontSize: 15,
                outline: "none",
                marginRight: 8
              }}
              placeholder="Nhập tin nhắn..."
              disabled={loading}
            />
            <button
              onClick={handleSend}
              style={{
                background: loading ? "#b3c6e0" : "linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 20,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s"
              }}
              title="Gửi"
              disabled={loading}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 
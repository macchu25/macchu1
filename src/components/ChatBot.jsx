import React, { useState, useRef, useEffect } from "react";
// import axios from "axios"; // Nếu muốn dùng axios thay fetch
import TRAIN_DATA from '../constants/trainData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

// Các câu gợi ý
const suggestedMessages = [
  "Bạn có thể giúp tôi tìm hiểu về dự án này không?",
  "Công nghệ nào được sử dụng trong portfolio này?",
  "Bạn có thể kể về kinh nghiệm làm việc không?",
  "Làm thế nào để liên hệ với bạn?",
  "Bạn có nhận dự án freelance không?"
];

// Hàm so khớp gần đúng (không phân biệt hoa thường, bỏ dấu câu)
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]/gi, '').replace(/\s+/g, ' ').trim();
}

function findAnswerFromTrain(input) {
  const normInput = normalize(input);
  for (const item of TRAIN_DATA) {
    if (normInput === normalize(item.question)) return item.answer;
    // Có thể mở rộng: if (normInput.includes(normalize(item.question))) return item.answer;
  }
  return null;
}

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

// Hàm gọi Gemini Embedding API
async function getGeminiEmbedding(text) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${apiKey}`;
  const body = {
    content: { parts: [{ text }] }
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data?.embedding?.values || null;
}

// Hàm tính cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
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
  const [showSuggestions, setShowSuggestions] = useState(true); // Thêm state này
  const messagesEndRef = useRef(null);
  const [trainEmbeddings, setTrainEmbeddings] = useState([]);

  useEffect(() => {
    async function embedTrainData() {
      const embeddings = [];
      for (const item of TRAIN_DATA) {
        const emb = await getGeminiEmbedding(item.question);
        embeddings.push(emb);
      }
      setTrainEmbeddings(embeddings);
    }
    embedTrainData();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Semantic search trả về answer nếu similarity > 0.8
  async function findAnswerSemantic(userQuestion) {
    if (!trainEmbeddings.length) return null;
    const userEmb = await getGeminiEmbedding(userQuestion);
    let bestIdx = -1, bestScore = 0;
    for (let i = 0; i < trainEmbeddings.length; i++) {
      if (!trainEmbeddings[i]) continue;
      const score = cosineSimilarity(userEmb, trainEmbeddings[i]);
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    if (bestScore > 0.9) {
      return TRAIN_DATA[bestIdx].answer;
    }
    return null;
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages([...messages, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    setMessages(msgs => [...msgs, { from: "bot", text: "Đang trả lời..." }]);
    // Semantic search trước
    let reply = null;
    try {
      reply = await findAnswerSemantic(userMessage);
    } catch (e) {}
    if (!reply) {
      reply = await callGeminiAPI(userMessage);
    }
    setMessages(msgs => [
      ...msgs.slice(0, -1),
      { from: "bot", text: reply }
    ]);
    setLoading(false);
  };

  // Hàm gửi tin nhắn trực tiếp với nội dung truyền vào
  const sendMessageDirect = async (message) => {
    if (!message.trim() || loading) return;
    setMessages([...messages, { from: "user", text: message }]);
    setLoading(true);
    setMessages(msgs => [...msgs, { from: "bot", text: "Đang trả lời..." }]);
    // Semantic search trước
    let reply = null;
    try {
      reply = await findAnswerSemantic(message);
    } catch (e) {}
    if (!reply) {
      reply = await callGeminiAPI(message);
    }
    setMessages(msgs => [
      ...msgs.slice(0, -1),
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
          width: 370,
          height: 520,
          background: "#fafdff",
          border: "1.5px solid #e3eaf5",
          borderRadius: 22,
          boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.13)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "box-shadow 0.2s"
        }}>
          <div style={{
            padding: 18,
            borderBottom: "1.5px solid #e3eaf5",
            fontWeight: 700,
            background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
            color: "#fff",
            fontSize: 20,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            boxShadow: "0 2px 8px #1976d233"
          }}>
            <span style={{display: 'flex', alignItems: 'center'}}>
              <span style={{fontSize: 26, marginRight: 8}}>🤖</span> <span>ChatBot</span>
            </span>
            <button style={{
              background: "rgba(255,255,255,0.18)",
              border: "none",
              color: "#fff",
              fontSize: 26,
              cursor: "pointer",
              borderRadius: 8,
              padding: "0 8px",
              transition: "background 0.2s"
            }} onClick={() => setOpen(false)} title="Đóng"
              onMouseEnter={e => e.target.style.background = '#1976d2'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.18)'}
            >×</button>
          </div>
          <div
            style={{
              flex: 1,
              padding: 18,
              overflowY: "auto",
              background: "#fafdff"
            }}
            className="custom-chat-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: "flex",
                flexDirection: msg.from === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                margin: "12px 0"
              }}>
                {msg.from === "bot" ? (
                  <span style={{
                    display: "inline-block",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)",
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: "38px",
                    fontWeight: "bold",
                    fontSize: 22,
                    marginRight: 10,
                    boxShadow: "0 2px 8px #1976d233"
                  }}>🤖</span>
                ) : (
                  <span style={{
                    display: "inline-block",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)",
                    color: "#222",
                    textAlign: "center",
                    lineHeight: "38px",
                    fontWeight: "bold",
                    fontSize: 22,
                    marginLeft: 10,
                    boxShadow: "0 2px 8px #38f9d733"
                  }}>🧑</span>
                )}
                <span
                  className="chat-bubble-bounce"
                  style={{
                    display: "inline-block",
                    background: msg.from === "user"
                      ? "linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)"
                      : "#e3f0fc",
                    color: msg.from === "user" ? "#222" : "#1976d2",
                    padding: "12px 18px",
                    borderRadius: 20,
                    maxWidth: 240,
                    fontSize: 16,
                    marginLeft: msg.from === "user" ? 0 : 10,
                    marginRight: msg.from === "user" ? 10 : 0,
                    boxShadow: msg.from === "user"
                      ? "0 2px 8px #38f9d733"
                      : "0 2px 8px #1976d233",
                    whiteSpace: "pre-line"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Phần gợi ý tin nhắn */}
          {showSuggestions && (
            <div style={{
              padding: "10px 18px 0 18px",
              borderTop: "1.5px solid #e3eaf5"
            }}>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8
              }}>
                {suggestedMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setShowSuggestions(false);
                      sendMessageDirect(msg);
                    }}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #1976d2",
                      borderRadius: 14,
                      padding: "8px 14px",
                      fontSize: 14,
                      color: "#1976d2",
                      cursor: "pointer",
                      fontWeight: 500,
                      boxShadow: "0 2px 8px #1976d211",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = "linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)";
                      e.target.style.color = "#fff";
                      e.target.style.border = "1.5px solid #1976d2";
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = "#fff";
                      e.target.style.color = "#1976d2";
                      e.target.style.border = "1.5px solid #1976d2";
                    }}
                    disabled={loading}
                    title={msg}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{
            padding: 18,
            borderTop: "1.5px solid #e3eaf5",
            background: "#fafdff",
            display: "flex",
            alignItems: "center"
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 16,
                border: "1.5px solid #b3c6e0",
                fontSize: 16,
                outline: "none",
                marginRight: 10,
                background: "#fff",
                color: "#222",
                boxShadow: "0 2px 8px #b3c6e011"
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
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 24,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                boxShadow: "0 2px 8px #1976d233"
              }}
              title="Gửi"
              disabled={loading}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 
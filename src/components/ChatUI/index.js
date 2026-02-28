import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import "./index.css";

function ChatUI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

   const [color, setColor] = useState("#ffffff");

  const handleSend = async (value) => {
    if (!value.trim()) return;

    // ✅ add user message
    setMessages((prev) => [
      ...prev,
      { type: "user", text: value }
    ]);
 

    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/search?q=${value}`
      );

      const data = await res.json();

       // ✅ CHANGE IS HERE
    let reply = "No result found";
   
    

   if (data.length > 0) { reply = data .map(item => Object.values(item)[0]) .join("\n\n"); }
      // ✅ add bot reply
      
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: reply },
      ]);
      
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <div className="chat-card">
        <h1 className="title">🤖 My AI Chat BOT</h1>
        <div className="loader"><BeatLoader color={color}/></div>
       

        {/* CHAT BOX */}
        <div className="chat-box">
           
          {messages.map((msg, i) => (
           
            <div key={i} className={`msg ${msg.type}`}>
               
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-area">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend(message)
            }
          />

          <button onClick={() => handleSend(message)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

function AIChat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your AI DJ. Tell me what you want to listen to."
    }
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: message
      },
      {
        role: "ai",
        text: "I'm analyzing your request and building a playlist..."
      }
    ]);

    setMessage("");
  };

  return (
    <div className="ai-chat">
      <div className="ai-header">
        <div className="ai-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <h3>AI DJ</h3>
          <span>Agent online</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`chat-message ${item.role}`}
          >
            {item.text}
          </div>
        ))}
      </div>

      <form
        className="chat-input"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Ask your AI DJ..."
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
        />

        <button type="submit">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default AIChat;
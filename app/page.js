"use client"

import { useState } from "react";
import { Send, User } from "lucide-react";

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Give me a short form, i will tell you long form of it..", sender: "other" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }])
    setInput("");
    fetch(`/api/longform?shortform=${encodeURIComponent(input)}`)
      .then(res => res.json())
      .then(data => setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }, { id: messages.length + 2, text: data.message, sender: "other" }]))
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto border shadow-lg">
      <div className="p-4 bg-green-600 text-white font-bold flex items-center gap-2">
        <User className="w-6 h-6" /> Long Form Bot
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 w-fit max-w-xs min-w-36 rounded-lg ${msg.sender === "me" ? "bg-green-500 text-white ml-auto" : "bg-white text-black"
              } shadow`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 flex gap-2 border-t bg-white">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type short form..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="p-2 bg-green-600 text-white rounded-lg" onClick={sendMessage}>
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

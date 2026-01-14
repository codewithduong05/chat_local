import React from "react";

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {/* {messages.map((msg, i) => (
        <div
          key={i}
          className={`message ${msg.self ? "self" : ""}`}
        >
          {msg.text}
        </div>
      ))} */}
    </div>
  );
}

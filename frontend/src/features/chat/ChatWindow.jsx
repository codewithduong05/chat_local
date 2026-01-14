const ChatWindowUI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, { message, createAt: new Date() }]);
      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-body">
        <ul>
          {messages.map((item, index) => (
            <li key={index} className="chat-message">
              <span>{item.createAt.toLocaleString()}</span>
              <p>{item.message}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindowUI;

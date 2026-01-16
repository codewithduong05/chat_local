import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);

  const selectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  return (
    <ChatContext.Provider
      value={{
        activeChatId,
        selectChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }
  return context;
}

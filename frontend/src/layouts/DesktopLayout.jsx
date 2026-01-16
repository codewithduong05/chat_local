// layouts/DesktopLayout.jsx
import React from "react";
import "@/styles/chat/desktop/index.css"
import ChatSidebar from "@/features/chat/ChatSidebar";
import { ChatProvider } from "@/contexts/ChatContext";
import ChatHeader from "@/features/chat/ChatHeader";

export default function DesktopLayout({ children }) {

  return (
    <ChatProvider>
      <div className="desktop-container">
        <aside className="header-profile">
          <ChatHeader />
        </aside>
        <aside className="sidebar">
          <ChatSidebar />
        </aside>
        {/* <h1>Hello</h1> */}
        <main className="main-content">{children}</main>
      </div>
    </ChatProvider>

  );
}

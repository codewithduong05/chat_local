import React from "react";
import ChatSidebar from "../features/chat/ChatSidebar";

export default function DesktopLayout({ children }) {
  return (
    <div className="desktop-container">
      <aside className="sidebar">
        <ChatSidebar/>
      </aside>
        {/* <h1>Hello</h1> */}
      <main className="main-content">{children}</main>
    </div>
  );
}

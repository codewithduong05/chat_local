import React from "react";

export default function MobileLayout({ children }) {
  return (
    <div className="mobile-container">
      {/* Header riêng cho mobile */}
      <header className="mobile-header">Chat App</header>
      <main className="mobile-main">{children}</main>
    </div>
  );
}

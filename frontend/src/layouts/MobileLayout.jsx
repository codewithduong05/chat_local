// layouts/MobileLayout.jsx
import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import "@/styles/chat/mobile/index.css"

export default function MobileLayout({ children }) {
  const [isShowSidebar, setShowSidebar] = useState(false);
  const handleShowSidebar = () => {
    setShowSidebar(!isShowSidebar);
  };
  const handleHideSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div className="mobile-container">
      {/* Header riêng cho mobile */}
      <header className="mobile-header">
        <div className="mobile-header-left">

          <div>Chat App</div>
          <div>
            {!isShowSidebar &&
             <button className="open-btn"><TiThMenu className="menu-icon" onClick={handleShowSidebar} /></button>}
          </div>

        </div>
      </header>
      {isShowSidebar && (
        <div className="popup-overlay" >
          <aside
            className="popup-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowSidebar(false)}>
              <IoClose className="menu-icon" />
            </button>
            <nav>
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </nav>
          </aside>
        </div>
      )}
      <main className="mobile-main">{children}</main>
    </div>
  );
}

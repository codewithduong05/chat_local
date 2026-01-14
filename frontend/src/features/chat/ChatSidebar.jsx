import React from 'react'
import { Link } from 'react-router-dom'

const ChatSidebar = () => {
    return (
        <aside className="chat-sidebar">
            <h2>Contacts</h2>
            <ul>
                <li>
                    <Link to="/chat/1">John Doe</Link>
                </li>
                <li>
                    <Link to="/chat/2">Jane Doe</Link>
                </li>
                <li>
                    <Link to="/chat/3">Bob Smith</Link>
                </li>
            </ul>
        </aside>
    )
}

export default ChatSidebar;

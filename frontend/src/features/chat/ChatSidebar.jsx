import React from 'react'
import { Link } from 'react-router-dom'
import { useChat } from '@/contexts/ChatContext'
const ChatSidebar = () => {
    const { selectChat, activeChatId } = useChat();
    const users = [
        { id: "room_1", name: "Alice", message : "hello" },
        { id: "room_2", name: "Bob" , message : "haha"},
    ];
    return (
        <aside className="chat-sidebar">
            <h2>Ưu tiên</h2>
            <input type="search" placeholder='Tim kiem' name="" id="" />
            <ul className='category-sidebar-p'>
                {users.map((u) => (
                    <li
                        className='category-sidebar'
                        key={u.id}
                        onClick={() => selectChat(u.id)}
                        style={{
                            background:activeChatId === u.id ? "#e6f1ff" : "",
                            // fontWeight: activeChatId === u.id ? "bold" : "normal",
                            cursor: "pointer",
                        }}
                    >
                       <span  style={{
                        fontWeight : "bold"
                       }}>{u.name}</span> 
                       <span style={{
                        fontWeight : "lighter"
                       }}>{u.message}</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ChatSidebar;

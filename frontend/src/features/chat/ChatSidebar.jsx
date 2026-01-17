import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useChat } from '@/contexts/ChatContext'
import useAuth from '@/hooks/useAuth';
import { getRoomChat } from '@/services/chat.service';
const ChatSidebar = () => {
    const { selectChat, activeChatId } = useChat();
    const [rooms, setRooms] = useState([]);

    const { isAuthenticated } = useAuth();
   if (!isAuthenticated) {
        return <Navigate to="/chat/login" replace />;
    }

   
 
  useEffect(() => {
     

        const fetechRoomChat = async () => {
            const reponse = await getRoomChat()
            // console.log(reponse[0]);
            setRooms(reponse)
        }
         fetechRoomChat();
    }, []);
    const users = [
        { id: "room_1", name: "Alice", message: "hello" },
        { id: "room_2", name: "Bob", message: "haha" },
    ];


    return (
        <aside className="chat-sidebar">
            <h2>Ưu tiên</h2>
            <input type="search" placeholder='Tim kiem' name="" id="" />
            <ul className='category-sidebar-p'>
                {rooms.map((u) => (
                    <li
                        className='category-sidebar'
                        key={u._id}
                        onClick={() => selectChat(u.id)}
                        style={{
                            background: activeChatId === u.id ? "#e6f1ff" : "",
                            // fontWeight: activeChatId === u.id ? "bold" : "normal",
                            cursor: "pointer",
                        }}
                    >
                        <span style={{
                            fontWeight: "bold"
                        }}>{u.name}</span>
                        <span style={{
                            fontWeight: "lighter"
                        }}>{u.message}</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ChatSidebar;

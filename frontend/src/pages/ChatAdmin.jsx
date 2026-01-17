import { useEffect, useState } from "react";
import { getRoomChat } from "@/services/chat.service";

const ChatAdmin = () => {
    const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
    const [room, setRooms] = useState()
    const [data,setData] = useState({
            name: '',
            des: ''
    })
    useEffect(() => {

        (async () => {
            const reponse = await getRoomChat()
            setRooms(reponse)
        })()
        if (!token) {
            setInterval(() => {
                window.location.href = '/chat';
            }, 1000);
        }

    }, [token])

    const handleSubmit = (e) => {
           e.preventDefault();
            console.log(data);
            
           
    }
    return (
        <div>
            <h1>Wellcome to dashboard admin</h1>
            <div style={{
                width: "400px",
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between"
            }}>
                <div>
                    <h2>Tao Rooms</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" placeholder="ten rooms"
                            onChange={(e) => setData((prev) => ({...prev, name: e.target.value}))}
                        />
                        <input type="text" placeholder="ghi chu room"
                            onChange={(e) => setData((prev) => ({...prev, des: e.target.value}))}
                        />
                        <button type="submit">Click create</button>
                    </form>
                </div>
                <div>
                    <span>Danh sach rooms : </span>
                    
                    {room?.map(i => {
                        return (
                            <div key={i._id} style={{
                                fontWeight:"bold"
                            }}>
                                {i.name}

                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    );
}

export default ChatAdmin;
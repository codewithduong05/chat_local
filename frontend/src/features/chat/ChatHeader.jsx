const ChatHeader = () => {
    const login_admin = () => {
        const input_admin = prompt("Nhap input");
        if (input_admin !== "admin") {
            alert("Mat khau sai")
        }
        localStorage.setItem("admin_active", true)
        localStorage.setItem('admin_token', input_admin);
        setInterval(() => {
            window.location.href = '/chat/admin';
        }, 1000);
    }
    const parking_lot = () => {
         setInterval(() => {
            window.location.href = '/parking_lot';
        }, 1000);
    }
    return (
        <header className="chat-header-window">
            <div className="chat-profile-header">
                <div className="chat-header-left">
                    <img src="https://avatars.githubusercontent.com/u/443328?v=4" alt="avatar" />
                    <div>
                        <h2>John Doe</h2>
                        <button>Chat</button>
                        <button>Danh ba</button>
                    </div>
                </div>

                <div className="chat-header-right">
                    <button>Cai dat</button>
                </div>
                <button onClick={login_admin}>Dang nhap admin</button>
                   <button
                   className="parking_lot"
                   onClick={parking_lot}>cho de xe</button>
            </div>

        </header>
    )
}
export default ChatHeader

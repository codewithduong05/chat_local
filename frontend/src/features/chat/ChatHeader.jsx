const ChatHeader = () => {
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
            </div>

        </header>
    )
}
export default ChatHeader

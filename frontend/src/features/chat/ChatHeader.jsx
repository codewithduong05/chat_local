const ChatHeader = () => {
    return (
        <header className="chat-header">
            <div className="chat-header-left">
                <img src="https://avatars.githubusercontent.com/u/443328?v=4" alt="avatar" />
            </div>
            <div className="chat-header-right">
                <h2>John Doe</h2>
                <div className="chat-header-right-buttons">
                    <button className="chat-header-right-button">
                        <i className="fas fa-info-circle"></i>
                    </button>
                    <button className="chat-header-right-button">
                        <i className="fas fa-phone"></i>
                    </button>
                    <button className="chat-header-right-button">
                        <i className="fas fa-video"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}

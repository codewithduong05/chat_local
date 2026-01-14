import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
 
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     const response = await fetch('/api/v1/user/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ username, password })
        //     });
        //     const data = await response.json();
        //     if (data.success) {
        //         localStorage.setItem('token', data.data.token);
        //         window.location.href = '/chat/home';
        //     } else {
        //         setError(data.message);
        //     }
        // } catch (error) {
        //     setError(error.message);
        // }
    };

    return (
        <div className="login-container">
            <h1 style={{marginBottom: 20 + "px"}} >Chat Local</h1>
            <form className="login-form" onSubmit={handleSubmit}>

                <h2>Đăng nhập</h2>

                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>

    );
};

export default Login;

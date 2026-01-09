import jwt from 'jsonwebtoken'
import message from '../config/messageApi.js';

const UserController = {
    login: async (req, res) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
    
        const token = jwt.sign(
            { id: user.id, username : user.username }, 
            process.env.JWT_KEY, 
            { expiresIn: '1d' }
        );

        if (token) {
            return res.status(200).json({
                data : {
                    username : user.name,
                    asstoken : token
                },
                
                message : message.success.login
            })
        }

    }
}

export default UserController
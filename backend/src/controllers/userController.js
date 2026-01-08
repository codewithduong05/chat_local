import jwt from 'jsonwebtoken'

const UserController = {
    login: async (req, res) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(user);
        
        const token = jwt.sign(
            { id: user.id, username : user.username }, 
            process.env.JWT_KEY, 
            { expiresIn: '1d' }
        );
        console.log(token);
        
        // res.json({ token });
    }
}

export default UserController
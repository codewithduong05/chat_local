import message from "../config/messageApi.js";
import jwt from 'jsonwebtoken'

const authMiddlewares = async (req, res, next) => {

    try {

        const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];
        const token = authorizationHeader ? authorizationHeader.trim().replace(/^Bearer\s+/, '') : null;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: message.error.user.auth || "Access token missing"
            });
        }

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
               return res.status(401).json({
                success: false,
                message: message.error.user.auth || "Access token missing"
            });
            } else {
                console.log('Decoded JWT:');
                console.log(decoded);
                req.user = {
                    id : decoded.id,
                    username : decoded.username
                };
                next()
            }
        });





    } catch (error) {
        console.log(error);
        
        res.json({
            success: false,
            message: message.error.server[500] 
        })
    }
}
export default authMiddlewares 
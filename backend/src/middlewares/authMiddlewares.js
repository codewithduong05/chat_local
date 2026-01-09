import message from "../config/messageApi.js";
import jwt from 'jsonwebtoken'

const authMiddlewares  =  async (req,res,next) => {
    try {
    
        const token = req.headers['authorization'] ? req.headers['authorization'].trim() : null;
        if (!token) {
            return res.status(401).json({
            success: false,
            message: message.error.user.auth || "Access token missing"
            });
        }
      

        
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            return res.status(401).json({
            success: false,
            message: message.error.server[401] || "Invalid token"
            });
        }
         
        req.user = decoded;
        next()


    } catch (error) {
        res.json({
            success : false , 
            message : message.error.server[500]
        })
    }
}
export default authMiddlewares 
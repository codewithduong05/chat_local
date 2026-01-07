import message from "../config/messageApi.js";
import UserModel from "../models/userModel.js";
const loginMiddlewares  =  async (req,res,next) => {
    try {
        const {username , password} = req.body
        
    } catch (error) {
        console.log(error);
        res.json({
            success : false , 
            message : message.error.server[500]
        })
    }
}
export default loginMiddlewares
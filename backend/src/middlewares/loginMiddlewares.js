import message from "../config/messageApi.js";
import UserModel from "../models/userModel.js";

import bcrypt from 'bcrypt'
import validate from "../config/validate.js";
const loginMiddlewares  =  async (req,res,next) => {
    try {
        const {username , password} = req.body
      
        if (!username || !password) {
             return res.json({
                success: false,
                message: message.error.input[1]
            })
        }
        const usernameExists = await UserModel.findOne({ username })
            if (!usernameExists) {
            return res.json({
                success: false,
                message: message.error.user
            });
        }      

        // so sanh hash password
        const hashingPasswordLogin = bcrypt.hashSync(password, usernameExists.password);
        if (hashingPasswordLogin !== usernameExists.password) {
            throw new Error(message.error.user.password)
        }


        req.user = usernameExists
        next()


    } catch (error) {
        res.json({
            success : false , 
            message : message.error.server[500]
        })
    }
}
export default loginMiddlewares
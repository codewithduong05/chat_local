const message = {
    success : {
        user : {
            username : "User name Success Full",
            chat : "Create chat success full",
            message_chat : "Message chat get Success full"
        },
        login : "User Admin login successfull"
    },
    error :  {
        input :{
          1 : 'Vui lòng điền các vào chỗ trống'  
        },
        user : {
            id_chat : "Room id chat not found",
            username : "user name is not found",
            password : "password ko dung",
            auth : "Phien lam viec het han",
            room : "Room not found or room is not valid"
        }, 
        server : {
            401 : "Token not found",
            404 : "Not Found Data ",
            500 : "Server is error"
        }
    }
} 
export default message
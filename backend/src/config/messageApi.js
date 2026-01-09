const message = {
    success : {
        user : {
            username : "User name Success Full"
        },
        login : "User Admin login successfull"
    },
    error :  {
        input :{
          1 : 'Vui lòng điền các vào chỗ trống'  
        },
        user : {
            username : "user name is not found",
            password : "password ko dung"
        }, 
        server : {
            404 : "Not Found Data ",
            500 : "Server is error"
        }
    }
} 
export default message
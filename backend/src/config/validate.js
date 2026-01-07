const validate = {
    user: {
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    sql_message: {
        // Ví dụ: chỉ cho phép ký tự chữ, số, dấu câu cơ bản và khoảng trắng, độ dài tối đa 1000 ký tự
        match: /^[\w\s.,!?'"@#$%^&*()\-+=:;<>\/\\|[\]{}~`]{1,1000}$/
    }
}

export default validate
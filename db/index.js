// mysql数据库相关, 引入第3方包mysql2
const mysql = require('mysql2')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Conventionnel75000', // 进入数据库的密码(即当初连接数据库时自己设置的密码)
  database:'my_db_01' // 对应使用的数据库名称
})

// 向外共享db数据库连接对象
module.exports = db
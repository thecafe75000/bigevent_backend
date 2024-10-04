// 导入数据库操作模块里的数据库连接对象db
const db = require('../db/index')

// 导入bcryptjs这个包
const bcrypt = require('bcryptjs')

// 导入生成 token 的包
const jwt = require('jsonwebtoken')

// 导入全局配置文件config.js里的 token 密钥
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body

  // 定义sql语句, 检查用户名是否被占用
  const sqlStr = `select * from ev_users where username=?`

  // 调用 db.query() 执行sql语句
  db.query(sqlStr, userinfo.username, (err, results)=> {
    // 执行 sql 语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }

    // 用户名被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名~' })
      return res.cc('用户名被占用，请更换其他用户名~')
    }

    // 用户名可用，但要给用户的密码进行加密
    // 调用 bcrypt.hashSync(待加密的明文密码，一个数值即随机盐的长度)对密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    // 定义插入新用户的 sql 语句
    const sql = 'insert into ev_users set ?'

    db.query(sql, { username: userinfo.username, password: userinfo.password },(err, results) => {
        if (err) {
          return res.cc(err)
        }
        // 判断影响行数是否为1，如果不为1，代表执行sql语句失败
        if (results.affectedRows !== 1) {
          return res.cc('注册用户失败,请稍后再试')
        }
        // 发送响应给前端注册用户成功
        res.cc('注册成功~', 0)
      }
    )
  })

}

// 用户登录的处理函数
exports.login = (req, res) => { 
  // 接收表单的数据
  const userinfo = req.body

  // 定义 sql 语句 
  const sql = `select * from ev_users where username=?`

  // 执行 sql 语句, 根据用户名查询用户的信息
  db.query(sql, userinfo.username, (err, results) => {
    // 执行 sql 语句失败
    if (err) {
      return res.cc(err)
    }

    // 执行 sql 语句成功，但是获取到的数据条数不等于1，说明没有查到对应的信息，这也是失败的情况
    if (results.length !== 1) {
      return res.cc('登录失败~')
    }

    // 判断用户密码是否正确
    // 调用 bcrypt.compareSync(用户提交的密码, 数据库中存储的对应用户密码)，比较这2个密码是否一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      return res.cc('登录失败~')
    }

    // 在服务器端生成 Token 字符串提供给前端 
    const user = { ...results[0], password: '', user_pic: '' }
    
    // 对用户的信息进行加密，生成 token 字符串
    // 使用jwt.sign(要加密的用户对象, 全局配置好的token密钥, 配置对象指定token有效期)
    // token 设置一年有效期
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用 res.send()将 Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功~',
      token: 'Bearer ' + tokenStr
    })
  })
  
}
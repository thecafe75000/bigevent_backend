// user 路由模块
const express = require('express')

// 创建路由实例对象
const router = express.Router()

// 导入用户路由处理函数的对应模块
const user_handle = require('../router_handler/user')

//1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户接口
router.post('/reguser',expressJoi(reg_login_schema), user_handle.regUser)

// 登录接口
router.post('/login', expressJoi(reg_login_schema), user_handle.login)

module.exports = router
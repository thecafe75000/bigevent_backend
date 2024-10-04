const express = require('express')

// 创建路由实例对象
const router = express.Router()

// 挂载路由

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const {update_userinfo_schema, update_password_schema} = require('../schema/user')

// 获取用户基本信息的接口
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息的接口
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 更新密码的接口,即重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

module.exports = router
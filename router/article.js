// 这是发布新文章的路由模块
const express = require('express')
const router = express.Router()

// 导入需要的处理函数模块
const article_handler = require('../router_handler/article')

// 导入 multer 和 path 模块
// 第3方包 multer 作用：解析form-data格式的请求体里的表单数据
const multer = require('multer')
const path = require('path')

// 创建 multer 实例, 通过该实例来解析form-data格式的数据
// 参数是一个配置对象 {dest:path.join(__dirname, '../uploads')} : 指定将文件存储到服务器的uploads目录里
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {add_article_schema } = require('../schema/article')

// 发布新文章的路由接口
// uploads.single('cover_img')中的参数是要上传的文件名字，要和接口文档中的对应文件名字一致
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

module.exports = router
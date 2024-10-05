// 这是发布新文章的路由模块
const express = require('express')
const router = express.Router()

// 导入需要的处理函数模块
const article_handle = require('../router_handler/article')

// 发布新文章的路由接口
router.post('/add', article_handle.addArticle)
module.exports = router
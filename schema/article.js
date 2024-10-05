// 导入定义验证规则的模块
const joi = require('@hapi/joi')

// 定义标题title, 分类id cate_id, 内容content, 发布状态state 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
// 允许用户发表的内容为空allow('')，因为有可能用户只发布了标题，而没有写内容
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state
  }
}
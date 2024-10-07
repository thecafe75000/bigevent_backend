// 导入定义验证规则的模块
 const joi = require('@hapi/joi')

// 定义 name 和 alias 的验证规则
const name = joi.string().required()
// alphanum()指只能包含字母和数字
const alias = joi.string().alphanum().required()

// 定义id的验证规则
const id = joi.number().integer().min(1).required()

// 验证规则对象 - 增加文章分类
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}

// 验证规则对象 - 删除文章分类
exports.delete_cate_schema = {
  params: {
    id
  }
}

// 验证规则对象 - 根据 id 获取文章分类
exports.get_cate_schema = {
  params: {
    id
  }
}

// 验证规则对象 - 更新文章分类
exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias
  }
}

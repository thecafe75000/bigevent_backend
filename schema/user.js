// 导入定义验证规则的包
const joi = require('@hapi/joi')

// 定义用户名的验证规则
const username = joi
  .string()
  .alphanum()
  .min(1)
  .max(20)
  .required()

// 定义密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 定义id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义验证用户头像 avatar 的规则
// dataUri()表示需要base64字符串: 即data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

// 导出验证注册和表单数据的规则对象
exports.reg_login_schema = {
  // 对 body 里的数据进行验证
  body: {
    username,
    password
  }
}

// 导出验证更新用户基本信息的规则对象
exports.update_userinfo_schema = {
  // 需要对 body 里面的数据进行验证
  body: {
    username, 
    id,
    nickname,
    email
  }
}

// 导出验证更新用户密码的规则对象
exports.update_password_schema = {
  body: {
    rePwd: password,
    oldPwd: password,
    // 新密码不能和旧密码一致, 还必须符合密码的验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

// 导出验证更新用户头像的规则对象
exports.update_avatar_schema = {
  body: {
    avatar
  }
}
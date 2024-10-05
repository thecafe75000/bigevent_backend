// 文章的处理函数模块
const path = require('path')
const db = require('../db/index')

// 发布文章的处理函数
exports.addArticle = (req, res) => {
  // console.log(req.file)
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('文章封面是必选参数')
  }
  // 说明数据都是合法的
  // 处理文章的信息对象
  const articleInfo = {
    // req.body里包含title, content, cate_id, state
    ...req.body,
    // 文章封面的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
    // 文章作者id
    author_id: req.user.id,
  }
  
  // 定义 sql 语句
  const sql = `insert into ev_articles set ?`
  db.query(sql, articleInfo, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('文章发布失败~')
    }
    res.cc('文章发布成功~',0)
  })
}
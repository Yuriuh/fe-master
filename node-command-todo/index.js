const db = require('./db')
const inquirer = require('inquirer')

// 面向接口编程
module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read()
  // 往里面添加一个 title 任务
  list.push({title, done: false})
  // 存储任务到文件
  db.write(list)
}

module.exports.clear = async (title) => {
  await db.write([])
}

module.exports.showAll = async (title) => {
  // 读取之前的任务
  const list = await db.read()
  // 打印之前的任务
  list.forEach((task, index) => {
    console.log(`${task.done ? '[x]' : '[_]'} ${index} - ${task.title}`)
  })
}

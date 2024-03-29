#!/usr/bin/env node
const program = require('commander')
const api = require('./api.js')
const pkg = require('./package.json')

program
  .version(pkg.version)
  .option('-x, --xxx', 'what the x')

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    api.add(words)
      .then(() => console.log('添加成功'))
      .catch(() => console.log('添加失败'))
  })

program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear()
      .then(() => console.log('清除完毕'))
      .catch(() => console.log('清除失败'))
  })

program.parse(process.argv)

if (isNotPassArgv()) {
  api.showAll()
}

function isNotPassArgv() {
  return process.argv.length === 2
}

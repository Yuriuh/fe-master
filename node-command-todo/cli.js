const program = require('commander');
const api = require('./index.js')

program
  .option('-x, --xxx', 'what the x');

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    // 如何合成一句话
    const words = args.slice(0, -1).join(' ')
    api.add(words)
      .then(() => console.log('添加成功'))
      .catch(() => console.log('添加失败'))
  });

program
  .command('clear')
  .description('clear all task')
  .action(() => {
    // 如何合成一句话
    api.clear()
      .then(() => console.log('清除完毕'))
      .catch(() => console.log('清除失败'))
  });

program.parse(process.argv);

// 如何知道命令行的参数
if (isNotPassArgv()) {
  api.showAll()
}

function isNotPassArgv() {
  return process.argv.length === 2
}
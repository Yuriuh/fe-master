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
  });

program
  .command('clear')
  .description('clear all task')
  .action((...args) => {
    // 如何合成一句话
  });

program.parse(process.argv);

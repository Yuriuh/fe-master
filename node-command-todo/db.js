const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        // if 扁平化技巧 return error
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(dbPath, string + '\n', error => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

// const task = {
//   title: title,
//   done: false
// }
// list.push(task)
// const string = JSON.stringify(list)
// fs.writeFile(dbPath, string + '\n', (error3) => {
//   if (error3) console.log(error3)
// })

module.exports = db

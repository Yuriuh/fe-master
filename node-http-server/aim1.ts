// 根据 url 返回不同文件
import * as http from 'http'
import * as p from 'path'
import { IncomingMessage, ServerResponse } from "http"
import { readFile } from 'fs'

const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request
  switch(url) {
    case '/index.html':
      readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    case '/style.css':
      readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    case '/main.js':
      readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
  }
})

// 如何得到请求消息体 ?
server.listen(8888)

// 处理查询参数
import * as http from 'http'
import * as p from 'path'
import * as url from 'url'
import { IncomingMessage, ServerResponse } from "http"
import { readFile } from 'fs'


const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request
  const { pathname, search } = url.parse(path)
  switch (pathname) {
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
    default:
      response.statusCode = 404
      response.end()
  }
})

server.listen(8888)

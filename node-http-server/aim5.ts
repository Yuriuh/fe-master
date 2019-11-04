import * as http from 'http'
import * as p from 'path'
import * as url from 'url'
import * as fs from 'fs'
import { IncomingMessage, ServerResponse } from "http"


const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request
  const { pathname, search } = url.parse(path)

  if (method !== 'GET') {
    response.writeHead(405, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end('这是一个假响应')
  }
  
  let filename = pathname.slice(1)
  if (filename === '') {
    filename = 'index.html'
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data)
        })
      } else if (error.errno === -4068) {
        response.statusCode = 403
        response.end('无权查看目录内容')
      } else {
        response.statusCode = 500
        response.end('服务器繁忙，请稍后再试')
      }
    } else {
      response.end(data)
    }
  })
})

server.listen(8888)

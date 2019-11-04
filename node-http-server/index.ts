import * as http from 'http'
import { IncomingMessage, ServerResponse } from "http"

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  console.log('request method', request.method)
  console.log('request url', request.url)
  console.log('request headers', request.headers)

  const array = []
  request.on('data', (chunk) => {
    array.push(chunk)
  })
  request.on('end', () => {
    const body = Buffer.concat(array).toString()
    console.log('body', body)

    response.statusCode = 200
    response.setHeader('X-Yuriuh', 'I am Yuriuh')
    // response.setHeader('Content-Type', 'image/png')

    response.write('1\n')
    response.write('2\n')
    response.write('3\n')
    response.end()
  })
})

// 如何得到请求消息体 ?
server.listen(8888)

import * as https from 'https'
import * as querystring from 'querystring'
import md5 from 'md5'
import { appid, appSecret } from './private'

type ErrorMap = {
  [key: string]: string
}
const errorMap: ErrorMap = {
  52003: '用户认证失败',
  54001: '签名失败',
  54004: '账户余额不足',
}
export const translate = (word: String) => {

  const salt = Math.random()
  const sign = md5(appid + word + salt + appSecret)

  let from: string
  let to: string

  if (/[a-zA-Z]/.test(word[0])) {
    // 英译为中
    from = 'en'
    to = 'zh'
  } else {
    from = 'zh'
    to = 'en'
  }
  
  const query: string = querystring.stringify({
    q: word,
    from,
    to,
    appid,
    salt,
    sign,
  })
  
  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: `/api/trans/vip/translate?${query}`,
    method: 'GET'
  }

  const request = https.request(options, (response) => {
    let chunks: Buffer[] = []
    response.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    response.on('end', (e: any) => {
      const string = Buffer.concat(chunks).toString()
      type BaiduResult = {
        error_code?: string
        error_msg?: string
        from: string
        to: string
        trans_result: {
          src: string
          dst: string
        }[]
      }
      const object: BaiduResult = JSON.parse(string)
      if (object.error_code) {
        console.error(errorMap[object.error_msg!] || object.error_msg)
        process.exit(2)
      } else {
        object.trans_result.forEach(o => {
          console.log(o.dst)
        })
        process.exit(0)
      }
    })
  })

  request.on('error', (e) => {
    console.log(e)
  })
  request.end()
}

import { op, load } from "xhip"
import * as _request from "request"
const request = load<typeof _request>("request")

export class App {
  @op echo(message: string) {
    return { message }
  }
  @op getServerIP() {
    return new Promise((resolve, reject) => {
      request.get('https://api.ipify.org?format=json', (error, response, body) => {
        if (error) reject(error)
        resolve({ ip: JSON.parse(body).ip })
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

export default new App()

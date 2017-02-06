import { op, load, broadcast, Application } from "xhip"
import * as _request from "request"
const request = load<typeof _request>("request")

export class App extends Application {
  @broadcast
  @op chat(message: string) {
    return {
      chat: {
        name: this.req.ip,
        message
      } 
    }
  }
}

export default new App()

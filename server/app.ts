import { op } from "xhip"

export class App {
  @op echo(message: string) {
    return { message }
  }
}

export default new App()

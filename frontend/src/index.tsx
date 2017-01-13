import * as React from "react"
import * as ReactDOM from "react-dom"

import { Client } from "xhip-client"
import app from "../../server/app"

class Body extends React.Component<void, { message: string, ip: string }> {
  constructor() {
    super()
    this.state = {
      message: "",
      ip: ""
    }
  }
  componentWillMount() {
    const client = new Client("http://localhost:8080", { ssl: false })
    client.exec([app.echo("hello, world!"), app.getServerIP()]).then((res: any) => {
      this.setState({
        message: res.message,
        ip: res.ip
      })
    })
  }
  render() {
    return <div>
      {this.state.message} from {this.state.ip}
    </div>
  }
}
window.addEventListener('load', () => {
  ReactDOM.render(<Body />, document.getElementById("app"))
})

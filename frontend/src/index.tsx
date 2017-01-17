import * as React from "react"
import * as ReactDOM from "react-dom"

import { Client } from "xhip-client"
import app from "../../server/app"

interface BodyState {
  message?: string
  ip?: string
  input?: string
  messageList?: string[]
}
class Body extends React.Component<void, BodyState> {
  client: Client
  input: string
  constructor() {
    super()
    this.state = {
      message: "",
      ip: "",
      input: "",
      messageList: []
    }
    const url = new URL(process.env.API_ENDPOINT).host
    this.client = new Client("http://" + url, { ssl: false })
  }
  componentWillMount() {
    this.client.exec([app.echo("hello, world!"), app.getServerIP()]).then((res: any) => {
      this.setState({
        message: res.message,
        ip: res.ip,
      })
    })
    this.client.subscribe([app.chat], (res: any) => {
      this.setState({
        messageList: [...this.state.messageList!, res['chat']]
      })
    })
  }
  onClick = () => {
    this.client.send([app.chat(this.state.input!)])
  }
  render() {
    const onChange = (e: React.FormEvent<HTMLInputElement>) => this.setState({
      input: (e.target as HTMLInputElement).value
    })
    return <div>
      {this.state.message} from {this.state.ip}
      <input value={this.state.input} onChange={onChange} />
      <button onClick={this.onClick}>send</button>
      <ul>
      { this.state.messageList!.map((x, i) => <li key={i}>{x}</li>) }

      </ul>
    </div>
  }
}
window.addEventListener('load', () => {
  ReactDOM.render(<Body />, document.getElementById("app"))
})

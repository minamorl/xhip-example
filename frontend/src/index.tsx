import * as React from "react"
import * as ReactDOM from "react-dom"

import { Client } from "xhip-client"
import app from "../../server/app"

class Body extends React.Component<void, { message: string }> {
  constructor() {
    super()
    this.state = {
      message: ""
    }
  }
  componentWillMount() {
    const client = new Client("http://localhost:8080/", { ssl: false })
    client.exec([app.echo("hello, world!")]).then((res: any) => {
      this.setState({
        message: res.message
      })
    })
  }
  render() {
    return <div>
      {this.state.message}
    </div>
  }
}
window.addEventListener('load', () => {
  ReactDOM.render(<Body />, document.getElementById("app"))
})

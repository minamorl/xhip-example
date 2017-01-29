import "../../node_modules/normalize-css/normalize.css"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Client } from "xhip-client"
import app from "../../server/app"
import { observer } from "mobx-react"
import appState from "./AppState"
import styled from 'styled-components'

import Message from "./components/Message"

const AppBase = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Lato', sans-serif;
  background: #ffffff;
`
const Content = styled.div`
  width: 800px;
  margin: 0 auto;
  height: 100%;
`

const HeaderLogoBase = styled.h1`
  font-size: 48px;
  margin: 0;
  padding: 30px 0;
`

const Button = styled.button`
  border-radius: 3px;
  border: none;
  color: #ffffff;
  background: #17f7d8;
  height: 30px;
  width: 84px;
`
const Input = styled.input`
  border-radius: 3px;
  height: 30px;
  flex: 1;
  border: 1px solid #eeeeee;
`
const InputGroup = styled.div`
  height: 30px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 20px;
`

@observer
class App extends React.Component<{}, {}> {
  client: Client
  input: string
  constructor() {
    super()
    const url = new URL(process.env.API_ENDPOINT || window.location.href).host
    this.client = new Client("http://" + url, { ssl: false })
  }
  componentWillMount() {
    this.client.exec([app.echo("hello, world!"), app.getServerIP()]).then((res: any) => {
      appState.message = res.message
      appState.ip = res.ip
    })
    this.client.subscribe([app.chat], (res: any) => {
      appState.messageList = [...appState.messageList, res['chat']]
    })
  }
  onClick = () => {
    this.client.send([app.chat(appState.input)])
  }
  render() {
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      appState.input = (e.target as HTMLInputElement).value
    }
    return <AppBase>
      <Content>
        <HeaderLogoBase>
          Xhip Example: Chat
        </HeaderLogoBase>
        <InputGroup>
          <Input value={appState.input} onChange={onChange} />
          <Button onClick={this.onClick}>send</Button>
        </InputGroup>
        <div>
        { appState.messageList.map((x, i) =>
          <Message name='anonymous' message={x} key={i}>{x}</Message>) }
        </div>
      </Content>
    </AppBase>
  }
}
window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById("app"))
})

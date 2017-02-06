import {observable} from "mobx"

interface Message {
  message: string
  name: string
}
export class AppState {
  @observable message = ''
  @observable input = ''
  @observable messageList: Message[] = []
}
export default new AppState()
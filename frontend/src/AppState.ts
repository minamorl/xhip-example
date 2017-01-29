import {observable} from "mobx"

export class AppState {
  @observable userIP = ''
  @observable message = ''
  @observable ip = ''
  @observable input = ''
  @observable messageList: string[] = []
}
export default new AppState()
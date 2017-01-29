import * as React from 'react'
import { observer } from 'mobx-react'
import styled, { keyframes } from 'styled-components'

const move = keyframes`
  from {
    transform: translateY(20px)
  }
  20% {
    transform: translateY(6px) 
  }
  to {
    transform: translateY(0px)
  }
`
const MessageBase = styled.div`
  margin: 10px 0;
  padding: 6px;
  height: 60px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 12px -1px rgba(0,0,0,0.03);
  animation: ${move} 2s;
`

const UserName = styled.div`
  width: 80px;
  color: #68b399;
  font-size: 12pt;
`
const MessageStr = styled.div`
  flex: 1;
`

const Message = observer((props: { name: string, message: string }) => (
  <MessageBase>
    <UserName>{props.name}</UserName>
    <MessageStr>{props.message}</MessageStr>
  </MessageBase>
))

export default Message
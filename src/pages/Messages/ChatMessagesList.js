import React from 'react'
import ChatMessageItem from './ChatMessageItem'
export default function ChatMessagesList({ messages}) {
  return (
    <ul>
        {messages && messages.map(item => <ChatMessageItem key={item.id} data={item}/>)}
    </ul>
  )
}

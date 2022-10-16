import React from 'react'
import PrivateChatRoom from './PrivateChatRoom'

export default function ChatMembers({members}) {
  return (
    <div className='chat-members'>
        {members.length === 2 && <PrivateChatRoom members={members}/>}
    </div>
  )
}

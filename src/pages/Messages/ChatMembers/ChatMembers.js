import React, { useEffect } from 'react'
import PrivateChatRoom from './PrivateChatRoom'
import { domain } from '../../../variables';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';

export default function ChatMembers({members}) {
  const { id } = useAuthContext().user;
  useEffect(() => {
    axios.get(`${domain}/friends/status/${members.find(item => item.id !== id).id}`, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then(res => console.log(res.data))
  }, [])
  return (
    <div className='chat-members'>
        {members.length === 2 && <PrivateChatRoom members={members}/>}
    </div>
  )
}

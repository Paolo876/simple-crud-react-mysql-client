import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
export default function PrivateChatRoom({members}) {
  // const receipientUser = members.find
  const { id } = useAuthContext().user;
  const { username, userInformation } = members.find(item => item.id !== id);
  const { firstName, lastName, birthday, imageData } = JSON.parse(userInformation);
  console.log(firstName, lastName, birthday, imageData)
  return (
    <div className='private-chat-room'>
      <div className="user-info">
          <div className="image-container">
            {/* IKIMAGE here avatar */}
          </div>
          <p>{username}</p>
          <p>{firstName} {lastName}</p>
      </div>
      <div className="actions">
        <button>Profile</button>
        <button>Mute Notifications</button>
      </div>
    </div>
  )
}

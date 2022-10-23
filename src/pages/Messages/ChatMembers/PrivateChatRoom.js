import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../../assets/default-profile.png";

import "./PrivateChatRoom.scss";

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
          {imageData ? 
            <IKImage 
              // className={status}
              src={imageData.photoURL} alt="user avatar"
              urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
              transformation={[{
              height: 40,
              width: 40
            }]}
            /> : 
            <img src={defaultAvatar} alt="user avatar"/>
          }
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

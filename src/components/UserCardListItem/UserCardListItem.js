import React from 'react'
import { IKImage } from 'imagekitio-react';
import { formatDistanceToNow } from 'date-fns';

import defaultAvatar from "../../assets/default-profile.png";
import "./UserCardListItem.scss";

export default function UserCardListItem({ userInformation, username, onClick, status, showName=false, chat=null, isLastMessageRead=null}) {
  const parsedInformation = userInformation && JSON.parse(userInformation);
  let date; 
  if(chat) date = new Date(chat.updatedAt)
  return (
    <li className='user-card-list-item'>
      <button onClick={onClick} className={`${isLastMessageRead !== null && isLastMessageRead ? '' : 'unread-container'}`}>
      {parsedInformation.imageData ? 
        <IKImage 
          className={status}
          src={parsedInformation.imageData.photoURL} alt="user avatar"
          urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
          transformation={[{
          height: 40,
          width: 40
          
        }]}
        /> : 
        <img src={defaultAvatar} alt="user avatar" className={status}/>
      }
      {!chat && <p>{username} {showName && <small>{`(${parsedInformation.firstName} ${parsedInformation.lastName})`}</small>}</p>}
      {chat && <div className={`chat-item ${isLastMessageRead !== null && isLastMessageRead ? '' : 'unread'}`}>
        <p className='username'>{username} {showName && <small>{`(${parsedInformation.firstName} ${parsedInformation.lastName})`}</small>}</p>
        <span className='message'>
          <p>{(chat.message.trim().length !== 0 && chat.message) || chat.media && chat.media}</p>
          <p>{formatDistanceToNow(date, {addSuffix: false})}</p>
        </span>
      </div>}
  </button></li>
  )
}

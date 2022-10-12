import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChatBoxInput from '../ChatBoxInput/ChatBoxInput';
import axios from 'axios';
import { domain, chatSocket } from '../../../variables';
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../../assets/default-profile.png";
import "./NewChatBoxBody.scss";

export default function NewChatBoxBody() {
  const id = useParams().id;
  const [ receipient, setReceipient ] = useState(null);
  const parsedInformation = receipient && JSON.parse(receipient.userInformation);
  const navigate = useNavigate();
  useEffect(() => {
    //get user info from id;
    axios.get(`${domain}/auth/profile/${id}`)
      .then(res => {
        setReceipient(res.data)
      })
  }, [id])
  const handleMessageSubmit = (data) => {
    const { message, media } = data;
    console.log(data)
    axios.post(`${domain}/chat/new-message`,
      { 
        message, 
        media,
        receipientId: id
      }, {
        headers: {
            accessToken: sessionStorage.getItem("accessToken")
          }
      }).then(res => {
        navigate(`/messages/${res.data}`)
        chatSocket.emit("new-chat-room", res.data)
      })
  }
  return (
    <div className='new-chat-box-body'>
        {receipient && <div className="receipient-info">
          {parsedInformation.imageData ? 
                  <IKImage 
                      src={parsedInformation.imageData.photoURL} alt="user avatar"
                      urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                      transformation={[{ height: 80, width: 80 }]}
                      onClick={() => navigate(`/profile/${id}`)}
                  /> : 
                  <img src={defaultAvatar} alt="user avatar" onClick={() => navigate(`/profile/${id}`)}/>
              }
              <div>
                <p className='username'>{receipient.username}</p>
                <p className='name'>{parsedInformation.firstName} {parsedInformation.lastName}</p>
              </div>
        </div>}
        <ChatBoxInput setMessages={handleMessageSubmit}/>
    </div>
  )
}

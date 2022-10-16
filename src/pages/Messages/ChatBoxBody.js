import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ChatBoxInput from "./ChatBoxInput/ChatBoxInput";
import axios from 'axios';
import { domain, chatSocket } from '../../variables';
import { useAuthContext } from '../../hooks/useAuthContext';
import ChatMessagesList from './ChatMessagesList';

import "./ChatBoxBody.scss";
import ChatMembers from './ChatMembers/ChatMembers';

export default function ChatBoxBody({ setChatList, chatList }) {
  const { user } = useAuthContext();
  const chatRoomId = useParams().id;
  const [ messages, setMessages ] = useState(null);
  const [newMessage, setNewMessage ] = useState(null);
  const navigate = useNavigate();
  const members = chatList.find(item => parseInt(item.chatRoomId) === parseInt(chatRoomId)) && chatList.find(item => parseInt(item.chatRoomId) === parseInt(chatRoomId)).members
  //on mount, join chatroom(socketio), list to incoming messages(socketio), retrieve existing messages
  useEffect(() => {
    //join chat room
    chatSocket.emit('room', {room: chatRoomId, user: user.id});
    chatSocket.on("receive-message", data => setNewMessage(data))
    //retrieve messages from chatRoom (limit 20)
    axios.get(`${domain}/chat/chat-room/${chatRoomId}`,{
      headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
      ).then( res => {
        if(!res.data.error){
          setMessages(res.data.ChatMessages)
          if(chatRoomId){
            if(res.data){
              // set isLastMessageRead property on chatList to true
              setChatList(prevState => {
                if(prevState) {
                  const updatedList = [...prevState];
                  const item = updatedList.find(item => parseInt(item.chatRoomId) === parseInt(res.data.id));
                  item.members.find(_item => _item.id === user.id).isLastMessageRead = true
                  return updatedList;
                } else {
                  return prevState
                }
              })
            }
          }
        } else {
          navigate("/messages")
        }
      })
    //leave room on unmount
    return () => {
      chatSocket.emit('leave', {room: chatRoomId, user: user.id});
    }
  }, [chatRoomId]);

  //update messages on newMessage update
  useEffect(() => {
    if(newMessage) setMessages(prevState => [newMessage, ...prevState])
  }, [newMessage]);

  return (
    <div className='chat-box-body'>
      <div className="chat-messages-container">
        <ChatMessagesList messages={messages}/>
        <ChatBoxInput chatRoomId={chatRoomId} setMessages={setMessages} />
      </div>
      <div className="chat-members">
        {members && <ChatMembers members={members}/>}
      </div>
    </div>
  )
}
